package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.dto.PageResponse;
import com.example.crud.entity.Institute;
import com.example.crud.service.InstituteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institutes")
@RequiredArgsConstructor
public class InstituteController {

    private final InstituteService instituteService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Institute>>> getAll(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "sortOrder") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        PageResponse<Institute> result = instituteService.getAll(search, status, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.ok("Institutes retrieved successfully", result));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Institute>>> getAllList() {
        return ResponseEntity.ok(ApiResponse.ok("All institutes retrieved", instituteService.getAllList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Institute>> getById(@PathVariable Long id) {
        Institute institute = instituteService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("Institute retrieved successfully", institute));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<Institute>> getBySlug(@PathVariable String slug) {
        Institute institute = instituteService.getBySlug(slug);
        return ResponseEntity.ok(ApiResponse.ok("Institute retrieved successfully", institute));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Institute>> create(@Valid @RequestBody Institute institute) {
        Institute created = instituteService.create(institute);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Institute created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Institute>> update(@PathVariable Long id, @Valid @RequestBody Institute institute) {
        Institute updated = instituteService.update(id, institute);
        return ResponseEntity.ok(ApiResponse.ok("Institute updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        instituteService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Institute deleted successfully", null));
    }
}
