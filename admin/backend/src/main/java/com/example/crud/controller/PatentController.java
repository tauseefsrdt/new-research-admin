package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.dto.PageResponse;
import com.example.crud.entity.Patent;
import com.example.crud.service.PatentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patents")
@RequiredArgsConstructor
public class PatentController {

    private final PatentService patentService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Patent>>> getAll(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "year", required = false) String year,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "srNo") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        PageResponse<Patent> result = patentService.getAll(search, status, year, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.ok("Patents retrieved successfully", result));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Patent>>> getAllList() {
        return ResponseEntity.ok(ApiResponse.ok("All patents retrieved", patentService.getAllList()));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<Patent>>> getFeatured() {
        return ResponseEntity.ok(ApiResponse.ok("Featured patents retrieved", patentService.getFeatured()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Patent>> getById(@PathVariable Long id) {
        Patent patent = patentService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("Patent retrieved successfully", patent));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Patent>> create(@Valid @RequestBody Patent patent) {
        Patent created = patentService.create(patent);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Patent created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Patent>> update(@PathVariable Long id, @Valid @RequestBody Patent patent) {
        Patent updated = patentService.update(id, patent);
        return ResponseEntity.ok(ApiResponse.ok("Patent updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        patentService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Patent deleted successfully", null));
    }
}
