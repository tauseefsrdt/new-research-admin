package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.dto.PageResponse;
import com.example.crud.entity.Patron;
import com.example.crud.service.PatronService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patrons")
@RequiredArgsConstructor
public class PatronController {

    private final PatronService patronService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Patron>>> getAll(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "sortOrder") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        PageResponse<Patron> result = patronService.getAll(search, type, status, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.ok("Patron records retrieved successfully", result));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<ApiResponse<List<Patron>>> getByType(@PathVariable String type) {
        return ResponseEntity.ok(ApiResponse.ok("Patrons for type retrieved", patronService.getByType(type)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Patron>> getById(@PathVariable Long id) {
        Patron patron = patronService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("Patron record retrieved successfully", patron));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Patron>> create(@Valid @RequestBody Patron patron) {
        Patron created = patronService.create(patron);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Patron record created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Patron>> update(@PathVariable Long id, @Valid @RequestBody Patron patron) {
        Patron updated = patronService.update(id, patron);
        return ResponseEntity.ok(ApiResponse.ok("Patron record updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        patronService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Patron record deleted successfully", null));
    }
}
