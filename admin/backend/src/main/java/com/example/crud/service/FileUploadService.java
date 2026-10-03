package com.example.crud.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.*;

@Service
@Slf4j
public class FileUploadService {

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of("jpg", "jpeg", "png", "webp");
    private static final Set<String> ALLOWED_MIME_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/webp"
    );
    private static final long MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

    @Value("${app.upload.dir:}")
    private String configuredUploadDir;

    private Path rootUploadPath;

    @PostConstruct
    public void init() {
        if (StringUtils.hasText(configuredUploadDir)) {
            rootUploadPath = Paths.get(configuredUploadDir).toAbsolutePath().normalize();
        } else {
            // Find project root: if running inside admin/backend, walk up to research-admin
            Path current = Paths.get("").toAbsolutePath().normalize();
            if (current.endsWith("backend") && current.getParent() != null && current.getParent().endsWith("admin")) {
                rootUploadPath = current.getParent().getParent().resolve("upload_image");
            } else if (current.endsWith("admin")) {
                rootUploadPath = current.getParent().resolve("upload_image");
            } else {
                rootUploadPath = current.resolve("upload_image");
            }
        }

        try {
            Files.createDirectories(rootUploadPath);
            log.info("Initialized project root image upload directory at: {}", rootUploadPath);
        } catch (IOException e) {
            log.error("Failed to create root upload directory: {}", e.getMessage(), e);
            throw new RuntimeException("Could not initialize upload storage location", e);
        }
    }

    public Path getRootUploadPath() {
        return rootUploadPath;
    }

    /**
     * Upload an image file to a designated module subdirectory in project-root/upload_image.
     *
     * @param file          The uploaded multipart file.
     * @param module        Subdirectory (e.g. "institute-department", "faculty", "events").
     * @param oldImagePath  Optional old image path to replace/clean up after successful upload.
     * @return Public relative URL path (e.g. "/upload_image/institute-department/dep-1234.png").
     */
    public UploadResponse uploadImage(MultipartFile file, String module, String oldImagePath) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("No file selected or uploaded file is empty.");
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new IllegalArgumentException("File size exceeds maximum allowed limit of 10MB.");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "image.png");
        String extension = getFileExtension(originalFilename).toLowerCase();

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Unsupported file format: ." + extension + ". Allowed formats: JPG, JPEG, PNG, WEBP.");
        }

        String contentType = file.getContentType();
        if (contentType != null && !ALLOWED_MIME_TYPES.contains(contentType.toLowerCase())) {
            log.warn("MIME type warning: received {} for extension {}", contentType, extension);
        }

        String cleanModule = sanitizeSubDir(module);
        Path targetDir = rootUploadPath.resolve(cleanModule);
        try {
            Files.createDirectories(targetDir);
        } catch (IOException e) {
            throw new RuntimeException("Could not create directory for module: " + cleanModule, e);
        }

        // Generate safe, collision-resistant unique filename
        String baseName = getBaseName(originalFilename);
        String safeBaseName = baseName.replaceAll("[^a-zA-Z0-9_-]", "-").replaceAll("-+", "-");
        if (safeBaseName.length() > 30) {
            safeBaseName = safeBaseName.substring(0, 30);
        }
        String uniqueFileName = String.format("%s-%s-%d.%s",
                safeBaseName.isEmpty() ? "img" : safeBaseName,
                UUID.randomUUID().toString().substring(0, 8),
                System.currentTimeMillis(),
                extension
        );

        Path targetFile = targetDir.resolve(uniqueFileName).normalize();

        // Security check: ensure target path is within root upload path
        if (!targetFile.startsWith(rootUploadPath)) {
            throw new SecurityException("Cannot store file outside current storage directory.");
        }

        // Write file
        try (InputStream is = file.getInputStream()) {
            Files.copy(is, targetFile, StandardCopyOption.REPLACE_EXISTING);
            log.info("Saved uploaded image to: {}", targetFile.toAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + uniqueFileName, e);
        }

        // Only after successful save, delete old image if it was inside upload_image
        if (StringUtils.hasText(oldImagePath)) {
            deleteOldImageIfInternal(oldImagePath);
        }

        String relativeUrl = "/upload_image/" + cleanModule + "/" + uniqueFileName;

        return UploadResponse.builder()
                .url(relativeUrl)
                .filename(uniqueFileName)
                .originalFilename(originalFilename)
                .module(cleanModule)
                .sizeBytes(file.getSize())
                .contentType(contentType)
                .build();
    }

    /**
     * Delete an image from upload_image storage if it belongs to it.
     */
    public boolean deleteOldImageIfInternal(String imagePath) {
        if (!StringUtils.hasText(imagePath)) {
            return false;
        }

        try {
            String path = imagePath.trim();
            if (path.startsWith("/upload_image/")) {
                path = path.substring("/upload_image/".length());
            } else if (path.startsWith("upload_image/")) {
                path = path.substring("upload_image/".length());
            } else {
                // Not an uploaded image file (e.g. existing static website URL), do not delete
                return false;
            }

            Path fileToDelete = rootUploadPath.resolve(path).normalize();
            if (fileToDelete.startsWith(rootUploadPath) && Files.exists(fileToDelete) && !Files.isDirectory(fileToDelete)) {
                Files.delete(fileToDelete);
                log.info("Deleted previous replaced image: {}", fileToDelete);
                return true;
            }
        } catch (Exception e) {
            log.warn("Could not delete old image file {}: {}", imagePath, e.getMessage());
        }
        return false;
    }

    private String sanitizeSubDir(String module) {
        if (!StringUtils.hasText(module)) {
            return "general";
        }
        String clean = module.trim().toLowerCase().replaceAll("[^a-z0-9_-]", "-").replaceAll("-+", "-");
        return clean.isEmpty() ? "general" : clean;
    }

    private String getFileExtension(String filename) {
        int dot = filename.lastIndexOf('.');
        return (dot > 0 && dot < filename.length() - 1) ? filename.substring(dot + 1) : "";
    }

    private String getBaseName(String filename) {
        int dot = filename.lastIndexOf('.');
        return dot > 0 ? filename.substring(0, dot) : filename;
    }

    @lombok.Data
    @lombok.Builder
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    public static class UploadResponse {
        private String url;
        private String filename;
        private String originalFilename;
        private String module;
        private long sizeBytes;
        private String contentType;
    }
}
