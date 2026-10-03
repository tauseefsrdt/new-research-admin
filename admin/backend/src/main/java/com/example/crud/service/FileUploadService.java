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

    private static final Set<String> ALLOWED_IMAGE_EXTENSIONS = Set.of("jpg", "jpeg", "png", "webp");
    private static final Set<String> ALLOWED_IMAGE_MIME_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/webp"
    );

    private static final Set<String> ALLOWED_PDF_EXTENSIONS = Set.of("pdf");
    private static final Set<String> ALLOWED_PDF_MIME_TYPES = Set.of(
            "application/pdf",
            "application/x-pdf",
            "application/acrobat",
            "applications/vnd.pdf",
            "text/pdf"
    );

    private static final long MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
    private static final long MAX_PDF_SIZE_BYTES = 50 * 1024 * 1024;   // 50MB

    @Value("${app.upload.dir:}")
    private String configuredUploadDir;

    @Value("${app.upload.pdf.dir:}")
    private String configuredPdfUploadDir;

    private Path rootUploadPath;     // For upload_image
    private Path rootPdfUploadPath;  // For upload_pdf

    @PostConstruct
    public void init() {
        Path projectRoot = findProjectRoot();

        if (StringUtils.hasText(configuredUploadDir)) {
            rootUploadPath = Paths.get(configuredUploadDir).toAbsolutePath().normalize();
        } else {
            rootUploadPath = projectRoot.resolve("upload_image").normalize();
        }

        if (StringUtils.hasText(configuredPdfUploadDir)) {
            rootPdfUploadPath = Paths.get(configuredPdfUploadDir).toAbsolutePath().normalize();
        } else {
            rootPdfUploadPath = projectRoot.resolve("upload_pdf").normalize();
        }

        try {
            Files.createDirectories(rootUploadPath);
            log.info("Initialized project root image upload directory at: {}", rootUploadPath);
            Files.createDirectories(rootPdfUploadPath);
            log.info("Initialized project root PDF upload directory at: {}", rootPdfUploadPath);
        } catch (IOException e) {
            log.error("Failed to create upload directories: {}", e.getMessage(), e);
            throw new RuntimeException("Could not initialize upload storage locations", e);
        }
    }

    private Path findProjectRoot() {
        Path current = Paths.get("").toAbsolutePath().normalize();
        if (current.endsWith("backend") && current.getParent() != null && current.getParent().endsWith("admin")) {
            return current.getParent().getParent();
        } else if (current.endsWith("admin")) {
            return current.getParent();
        }
        return current;
    }

    public Path getRootUploadPath() {
        return rootUploadPath;
    }

    public Path getRootPdfUploadPath() {
        return rootPdfUploadPath;
    }

    /**
     * Upload an image file to project-root/upload_image/<module>/
     * Deletes previous image if oldImagePath is provided.
     */
    public UploadResponse uploadImage(MultipartFile file, String module, String oldImagePath) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("No file selected or uploaded file is empty.");
        }

        if (file.getSize() > MAX_IMAGE_SIZE_BYTES) {
            throw new IllegalArgumentException("Image file size exceeds maximum allowed limit of 15MB.");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "image.png");
        String extension = getFileExtension(originalFilename).toLowerCase();

        if (!ALLOWED_IMAGE_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Unsupported image format: ." + extension + ". Allowed formats: JPG, JPEG, PNG, WEBP.");
        }

        String contentType = file.getContentType();
        String cleanModule = sanitizeSubDir(module);
        Path targetDir = rootUploadPath.resolve(cleanModule);
        try {
            Files.createDirectories(targetDir);
        } catch (IOException e) {
            throw new RuntimeException("Could not create directory for module: " + cleanModule, e);
        }

        String safeBaseName = sanitizeFilename(getBaseName(originalFilename));
        String uniqueFileName = String.format("%s-%s-%d.%s",
                safeBaseName.isEmpty() ? "img" : safeBaseName,
                UUID.randomUUID().toString().substring(0, 8),
                System.currentTimeMillis(),
                extension
        );

        Path targetFile = targetDir.resolve(uniqueFileName).normalize();

        if (!targetFile.startsWith(rootUploadPath)) {
            throw new SecurityException("Cannot store file outside image storage directory.");
        }

        try (InputStream is = file.getInputStream()) {
            Files.copy(is, targetFile, StandardCopyOption.REPLACE_EXISTING);
            log.info("Saved uploaded image to: {}", targetFile.toAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image: " + uniqueFileName, e);
        }

        // Clean up old image if replacing
        if (StringUtils.hasText(oldImagePath)) {
            deleteOldFileIfInternal(oldImagePath);
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
     * Upload a PDF file to project-root/upload_pdf/<module>/
     * Deletes previous PDF if oldPdfPath is provided.
     */
    public UploadResponse uploadPdf(MultipartFile file, String module, String oldPdfPath) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("No file selected or uploaded file is empty.");
        }

        if (file.getSize() > MAX_PDF_SIZE_BYTES) {
            throw new IllegalArgumentException("PDF file size exceeds maximum allowed limit of 50MB.");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "document.pdf");
        String extension = getFileExtension(originalFilename).toLowerCase();

        if (!ALLOWED_PDF_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Unsupported file format: ." + extension + ". Only PDF (.pdf) files are allowed.");
        }

        String contentType = file.getContentType();
        String cleanModule = sanitizeSubDir(module);
        Path targetDir = rootPdfUploadPath.resolve(cleanModule);
        try {
            Files.createDirectories(targetDir);
        } catch (IOException e) {
            throw new RuntimeException("Could not create PDF directory for module: " + cleanModule, e);
        }

        String safeBaseName = sanitizeFilename(getBaseName(originalFilename));
        String uniqueFileName = String.format("%s-%s-%d.%s",
                safeBaseName.isEmpty() ? "doc" : safeBaseName,
                UUID.randomUUID().toString().substring(0, 8),
                System.currentTimeMillis(),
                extension
        );

        Path targetFile = targetDir.resolve(uniqueFileName).normalize();

        if (!targetFile.startsWith(rootPdfUploadPath)) {
            throw new SecurityException("Cannot store file outside PDF storage directory.");
        }

        try (InputStream is = file.getInputStream()) {
            Files.copy(is, targetFile, StandardCopyOption.REPLACE_EXISTING);
            log.info("Saved uploaded PDF to: {}", targetFile.toAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException("Failed to store PDF file: " + uniqueFileName, e);
        }

        // Clean up old PDF if replacing
        if (StringUtils.hasText(oldPdfPath)) {
            deleteOldFileIfInternal(oldPdfPath);
        }

        String relativeUrl = "/upload_pdf/" + cleanModule + "/" + uniqueFileName;

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
     * Delete any file from upload_image or upload_pdf storage if it resides in them.
     */
    public boolean deleteOldFileIfInternal(String filePath) {
        if (!StringUtils.hasText(filePath)) {
            return false;
        }

        try {
            String path = filePath.trim();

            // Check if full URL containing /upload_image/ or /upload_pdf/
            if (path.contains("/upload_image/")) {
                path = path.substring(path.indexOf("/upload_image/") + "/upload_image/".length());
                Path fileToDelete = rootUploadPath.resolve(path).normalize();
                if (fileToDelete.startsWith(rootUploadPath) && Files.exists(fileToDelete) && !Files.isDirectory(fileToDelete)) {
                    Files.delete(fileToDelete);
                    log.info("Deleted previous replaced image: {}", fileToDelete);
                    return true;
                }
            } else if (path.startsWith("upload_image/")) {
                path = path.substring("upload_image/".length());
                Path fileToDelete = rootUploadPath.resolve(path).normalize();
                if (fileToDelete.startsWith(rootUploadPath) && Files.exists(fileToDelete) && !Files.isDirectory(fileToDelete)) {
                    Files.delete(fileToDelete);
                    log.info("Deleted previous replaced image: {}", fileToDelete);
                    return true;
                }
            } else if (path.contains("/upload_pdf/")) {
                path = path.substring(path.indexOf("/upload_pdf/") + "/upload_pdf/".length());
                Path fileToDelete = rootPdfUploadPath.resolve(path).normalize();
                if (fileToDelete.startsWith(rootPdfUploadPath) && Files.exists(fileToDelete) && !Files.isDirectory(fileToDelete)) {
                    Files.delete(fileToDelete);
                    log.info("Deleted previous replaced PDF: {}", fileToDelete);
                    return true;
                }
            } else if (path.startsWith("upload_pdf/")) {
                path = path.substring("upload_pdf/".length());
                Path fileToDelete = rootPdfUploadPath.resolve(path).normalize();
                if (fileToDelete.startsWith(rootPdfUploadPath) && Files.exists(fileToDelete) && !Files.isDirectory(fileToDelete)) {
                    Files.delete(fileToDelete);
                    log.info("Deleted previous replaced PDF: {}", fileToDelete);
                    return true;
                }
            }
        } catch (Exception e) {
            log.warn("Could not delete old file {}: {}", filePath, e.getMessage());
        }
        return false;
    }

    public boolean deleteOldImageIfInternal(String imagePath) {
        return deleteOldFileIfInternal(imagePath);
    }

    public boolean deleteOldPdfIfInternal(String pdfPath) {
        return deleteOldFileIfInternal(pdfPath);
    }

    private String sanitizeFilename(String baseName) {
        if (!StringUtils.hasText(baseName)) {
            return "file";
        }
        String safe = baseName.replaceAll("[^a-zA-Z0-9_-]", "-").replaceAll("-+", "-");
        return safe.length() > 30 ? safe.substring(0, 30) : safe;
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
