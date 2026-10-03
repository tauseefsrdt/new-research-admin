package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.dto.PageResponse;
import com.example.crud.entity.PhdSupervisorYearwise;
import com.example.crud.service.PhdSupervisorYearwiseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phd-supervisors")
@RequiredArgsConstructor
public class PhdSupervisorYearwiseController {

    private final PhdSupervisorYearwiseService service;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<PhdSupervisorYearwise>>> getAll(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "deptCode", required = false) String deptCode,
            @RequestParam(value = "instituteSlug", required = false) String instituteSlug,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        PageResponse<PhdSupervisorYearwise> result = service.getAll(search, deptCode, instituteSlug, status, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.ok("PhD supervisor records retrieved successfully", result));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<PhdSupervisorYearwise>>> getAllList() {
        return ResponseEntity.ok(ApiResponse.ok("All PhD supervisor records retrieved", service.getAllList()));
    }

    @GetMapping("/by-institute/{instituteSlug}")
    public ResponseEntity<ApiResponse<List<PhdSupervisorYearwise>>> getByInstitute(@PathVariable String instituteSlug) {
        return ResponseEntity.ok(ApiResponse.ok("PhD supervisor records for institute retrieved", service.getByInstitute(instituteSlug)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PhdSupervisorYearwise>> getById(@PathVariable Long id) {
        PhdSupervisorYearwise record = service.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("PhD supervisor record retrieved successfully", record));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PhdSupervisorYearwise>> create(@Valid @RequestBody PhdSupervisorYearwise record) {
        PhdSupervisorYearwise created = service.create(record);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("PhD supervisor record created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PhdSupervisorYearwise>> update(@PathVariable Long id, @Valid @RequestBody PhdSupervisorYearwise record) {
        PhdSupervisorYearwise updated = service.update(id, record);
        return ResponseEntity.ok(ApiResponse.ok("PhD supervisor record updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("PhD supervisor record deleted successfully", null));
    }
}
