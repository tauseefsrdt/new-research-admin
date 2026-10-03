package com.example.crud.controller;

import com.example.crud.service.FileUploadService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;

@RestController
@RequiredArgsConstructor
@Slf4j
public class FileServingController {

    private final FileUploadService fileUploadService;

    @GetMapping("/upload_pdf/**")
    public ResponseEntity<Resource> servePdf(HttpServletRequest request) {
        String fullPath = request.getRequestURI();
        int prefixIndex = fullPath.indexOf("/upload_pdf/");
        String relativePath = (prefixIndex >= 0) ? fullPath.substring(prefixIndex + "/upload_pdf/".length()) : fullPath;

        Path root = fileUploadService.getRootPdfUploadPath();
        Path targetFile = root.resolve(relativePath).normalize();

        if (!targetFile.startsWith(root) || !targetFile.toFile().exists() || targetFile.toFile().isDirectory()) {
            log.warn("Requested PDF file not found: {}", targetFile);
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(targetFile);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + targetFile.getFileName().toString() + "\"")
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=3600")
                .body(resource);
    }

    @GetMapping("/upload_image/**")
    public ResponseEntity<Resource> serveImage(HttpServletRequest request) {
        String fullPath = request.getRequestURI();
        int prefixIndex = fullPath.indexOf("/upload_image/");
        String relativePath = (prefixIndex >= 0) ? fullPath.substring(prefixIndex + "/upload_image/".length()) : fullPath;

        Path root = fileUploadService.getRootUploadPath();
        Path targetFile = root.resolve(relativePath).normalize();

        if (!targetFile.startsWith(root) || !targetFile.toFile().exists() || targetFile.toFile().isDirectory()) {
            log.warn("Requested image file not found: {}", targetFile);
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(targetFile);
        MediaType mediaType = MediaTypeFactory.getMediaType(resource).orElse(MediaType.IMAGE_PNG);

        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + targetFile.getFileName().toString() + "\"")
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=3600")
                .body(resource);
    }
}
