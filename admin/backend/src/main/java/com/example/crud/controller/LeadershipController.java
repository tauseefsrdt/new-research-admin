package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.dto.PageResponse;
import com.example.crud.entity.Leadership;
import com.example.crud.service.LeadershipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderships")
@RequiredArgsConstructor
public class LeadershipController {

    private final LeadershipService leadershipService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Leadership>>> getAll(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "sortOrder") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        PageResponse<Leadership> result = leadershipService.getAll(search, status, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.ok("Leadership records retrieved successfully", result));
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<Leadership>>> getActive() {
        return ResponseEntity.ok(ApiResponse.ok("Active leadership records retrieved", leadershipService.getActiveList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Leadership>> getById(@PathVariable Long id) {
        Leadership leadership = leadershipService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("Leadership record retrieved successfully", leadership));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Leadership>> create(@Valid @RequestBody Leadership leadership) {
        Leadership created = leadershipService.create(leadership);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Leadership record created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Leadership>> update(@PathVariable Long id, @Valid @RequestBody Leadership leadership) {
        Leadership updated = leadershipService.update(id, leadership);
        return ResponseEntity.ok(ApiResponse.ok("Leadership record updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        leadershipService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Leadership record deleted successfully", null));
    }
}
