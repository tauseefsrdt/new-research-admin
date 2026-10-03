package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping({"/api/upload", "/api/public/upload"})
@RequiredArgsConstructor
@Slf4j
public class FileUploadController {

    private final FileUploadService fileUploadService;

    /**
     * Upload an image for any module (e.g. institute-department, faculty, events).
     */
    @PostMapping("/image")
    public ResponseEntity<ApiResponse<FileUploadService.UploadResponse>> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "module", defaultValue = "general") String module,
            @RequestParam(value = "oldImagePath", required = false) String oldImagePath
    ) {
        log.info("Received image upload request for module '{}', oldImagePath: '{}', originalFilename: '{}'",
                module, oldImagePath, file != null ? file.getOriginalFilename() : "null");

        FileUploadService.UploadResponse response = fileUploadService.uploadImage(file, module, oldImagePath);
        return ResponseEntity.ok(ApiResponse.ok("Image uploaded successfully", response));
    }

    /**
     * Upload a PDF file for any module (e.g. patents, research-papers, rc-documents, theses).
     */
    @PostMapping("/pdf")
    public ResponseEntity<ApiResponse<FileUploadService.UploadResponse>> uploadPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "module", defaultValue = "general") String module,
            @RequestParam(value = "oldPdfPath", required = false) String oldPdfPath
    ) {
        log.info("Received PDF upload request for module '{}', oldPdfPath: '{}', originalFilename: '{}'",
                module, oldPdfPath, file != null ? file.getOriginalFilename() : "null");

        FileUploadService.UploadResponse response = fileUploadService.uploadPdf(file, module, oldPdfPath);
        return ResponseEntity.ok(ApiResponse.ok("PDF uploaded successfully", response));
    }

    /**
     * Delete an uploaded image file.
     */
    @DeleteMapping("/image")
    public ResponseEntity<ApiResponse<Boolean>> deleteImage(
            @RequestParam("imagePath") String imagePath
    ) {
        boolean deleted = fileUploadService.deleteOldImageIfInternal(imagePath);
        return ResponseEntity.ok(ApiResponse.ok(deleted ? "Image deleted" : "Image not found or not in local storage", deleted));
    }

    /**
     * Delete an uploaded PDF file.
     */
    @DeleteMapping("/pdf")
    public ResponseEntity<ApiResponse<Boolean>> deletePdf(
            @RequestParam("pdfPath") String pdfPath
    ) {
        boolean deleted = fileUploadService.deleteOldPdfIfInternal(pdfPath);
        return ResponseEntity.ok(ApiResponse.ok(deleted ? "PDF deleted" : "PDF not found or not in local storage", deleted));
    }

    /**
     * Universal file deletion (either image or PDF in storage).
     */
    @DeleteMapping("/file")
    public ResponseEntity<ApiResponse<Boolean>> deleteFile(
            @RequestParam("filePath") String filePath
    ) {
        boolean deleted = fileUploadService.deleteOldFileIfInternal(filePath);
        return ResponseEntity.ok(ApiResponse.ok(deleted ? "File deleted" : "File not found or not in local storage", deleted));
    }
}

