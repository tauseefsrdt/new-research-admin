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
     *
     * @param file         The multipart image file.
     * @param module       Target module directory under upload_image/ (e.g. "institute-department").
     * @param oldImagePath Optional previous image path to replace.
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
     * Delete an uploaded image file.
     */
    @DeleteMapping("/image")
    public ResponseEntity<ApiResponse<Boolean>> deleteImage(
            @RequestParam("imagePath") String imagePath
    ) {
        boolean deleted = fileUploadService.deleteOldImageIfInternal(imagePath);
        return ResponseEntity.ok(ApiResponse.ok(deleted ? "Image deleted" : "Image not found or not in upload_image storage", deleted));
    }
}
