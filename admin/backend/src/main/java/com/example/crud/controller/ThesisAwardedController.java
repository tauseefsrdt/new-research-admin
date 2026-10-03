package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.dto.PageResponse;
import com.example.crud.entity.ThesisAwarded;
import com.example.crud.service.ThesisAwardedService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/theses")
@RequiredArgsConstructor
public class ThesisAwardedController {

    private final ThesisAwardedService thesisAwardedService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ThesisAwarded>>> getAll(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "institute", required = false) String institute,
            @RequestParam(value = "department", required = false) String department,
            @RequestParam(value = "session", required = false) String session,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "srNo") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        PageResponse<ThesisAwarded> result = thesisAwardedService.getAll(search, institute, department, session, status, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.ok("Thesis awarded records retrieved successfully", result));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<ThesisAwarded>>> getAllList() {
        return ResponseEntity.ok(ApiResponse.ok("All thesis records retrieved", thesisAwardedService.getAllList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ThesisAwarded>> getById(@PathVariable Long id) {
        ThesisAwarded thesis = thesisAwardedService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("Thesis awarded record retrieved successfully", thesis));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ThesisAwarded>> create(@Valid @RequestBody ThesisAwarded thesis) {
        ThesisAwarded created = thesisAwardedService.create(thesis);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Thesis awarded record created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ThesisAwarded>> update(@PathVariable Long id, @Valid @RequestBody ThesisAwarded thesis) {
        ThesisAwarded updated = thesisAwardedService.update(id, thesis);
        return ResponseEntity.ok(ApiResponse.ok("Thesis awarded record updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        thesisAwardedService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Thesis awarded record deleted successfully", null));
    }
}
