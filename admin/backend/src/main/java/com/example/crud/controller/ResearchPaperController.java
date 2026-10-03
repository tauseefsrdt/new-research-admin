package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.dto.CommonDtos;
import com.example.crud.dto.PageResponse;
import com.example.crud.entity.ResearchPaper;
import com.example.crud.service.ResearchPaperService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/research-papers")
@RequiredArgsConstructor
public class ResearchPaperController {

    private final ResearchPaperService researchPaperService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ResearchPaper>>> getAll(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "department", required = false) String department,
            @RequestParam(value = "year", required = false) String year,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "srNo") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        PageResponse<ResearchPaper> result = researchPaperService.getAll(search, status, department, year, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.ok("Research papers retrieved successfully", result));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<ResearchPaper>>> getAllList() {
        return ResponseEntity.ok(ApiResponse.ok("All research papers retrieved", researchPaperService.getAllList()));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ResearchPaper>>> getFeatured() {
        return ResponseEntity.ok(ApiResponse.ok("Featured research papers retrieved", researchPaperService.getFeatured()));
    }

    @GetMapping("/departments")
    public ResponseEntity<ApiResponse<List<CommonDtos.DepartmentCount>>> getDepartmentCounts() {
        return ResponseEntity.ok(ApiResponse.ok("Department counts retrieved", researchPaperService.getDepartmentCounts()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ResearchPaper>> getById(@PathVariable Long id) {
        ResearchPaper paper = researchPaperService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("Research paper retrieved successfully", paper));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ResearchPaper>> create(@Valid @RequestBody ResearchPaper paper) {
        ResearchPaper created = researchPaperService.create(paper);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Research paper created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ResearchPaper>> update(@PathVariable Long id, @Valid @RequestBody ResearchPaper paper) {
        ResearchPaper updated = researchPaperService.update(id, paper);
        return ResponseEntity.ok(ApiResponse.ok("Research paper updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        researchPaperService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Research paper deleted successfully", null));
    }
}
