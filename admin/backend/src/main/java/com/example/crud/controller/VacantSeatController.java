package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.dto.PageResponse;
import com.example.crud.entity.VacantSeat;
import com.example.crud.service.VacantSeatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacant-seats")
@RequiredArgsConstructor
public class VacantSeatController {

    private final VacantSeatService vacantSeatService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<VacantSeat>>> getAll(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "institute", required = false) String institute,
            @RequestParam(value = "department", required = false) String department,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        PageResponse<VacantSeat> result = vacantSeatService.getAll(search, institute, department, status, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.ok("Vacant seat records retrieved successfully", result));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<VacantSeat>>> getAllList() {
        return ResponseEntity.ok(ApiResponse.ok("All vacant seats retrieved", vacantSeatService.getAllList()));
    }

    @GetMapping("/by-institute")
    public ResponseEntity<ApiResponse<List<VacantSeat>>> getByInstitute(@RequestParam String institute) {
        return ResponseEntity.ok(ApiResponse.ok("Vacant seats for institute retrieved", vacantSeatService.getByInstitute(institute)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<VacantSeat>> getById(@PathVariable Long id) {
        VacantSeat seat = vacantSeatService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("Vacant seat record retrieved successfully", seat));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<VacantSeat>> create(@Valid @RequestBody VacantSeat seat) {
        VacantSeat created = vacantSeatService.create(seat);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Vacant seat record created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<VacantSeat>> update(@PathVariable Long id, @Valid @RequestBody VacantSeat seat) {
        VacantSeat updated = vacantSeatService.update(id, seat);
        return ResponseEntity.ok(ApiResponse.ok("Vacant seat record updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        vacantSeatService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Vacant seat record deleted successfully", null));
    }
}
