package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.dto.PageResponse;
import com.example.crud.entity.GalleryImage;
import com.example.crud.service.GalleryImageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery-images")
@RequiredArgsConstructor
public class GalleryImageController {

    private final GalleryImageService galleryImageService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<GalleryImage>>> getAll(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "sortOrder") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        PageResponse<GalleryImage> result = galleryImageService.getAll(search, category, status, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.ok("Gallery images retrieved successfully", result));
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<GalleryImage>>> getActive() {
        return ResponseEntity.ok(ApiResponse.ok("Active gallery images retrieved", galleryImageService.getActiveList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GalleryImage>> getById(@PathVariable Long id) {
        GalleryImage image = galleryImageService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("Gallery image retrieved successfully", image));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<GalleryImage>> create(@Valid @RequestBody GalleryImage image) {
        GalleryImage created = galleryImageService.create(image);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Gallery image created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GalleryImage>> update(@PathVariable Long id, @Valid @RequestBody GalleryImage image) {
        GalleryImage updated = galleryImageService.update(id, image);
        return ResponseEntity.ok(ApiResponse.ok("Gallery image updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        galleryImageService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Gallery image deleted successfully", null));
    }
}
