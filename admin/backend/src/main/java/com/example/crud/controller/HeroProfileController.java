package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.entity.HeroProfile;
import com.example.crud.service.HeroProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hero-profiles")
@RequiredArgsConstructor
public class HeroProfileController {

    private final HeroProfileService heroProfileService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<HeroProfile>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok("Hero profiles retrieved successfully", heroProfileService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<HeroProfile>> getById(@PathVariable Long id) {
        HeroProfile profile = heroProfileService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("Hero profile retrieved successfully", profile));
    }

    @GetMapping("/key/{key}")
    public ResponseEntity<ApiResponse<HeroProfile>> getByKey(@PathVariable String key) {
        HeroProfile profile = heroProfileService.getByKey(key);
        return ResponseEntity.ok(ApiResponse.ok("Hero profile retrieved successfully", profile));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<HeroProfile>> create(@Valid @RequestBody HeroProfile profile) {
        HeroProfile created = heroProfileService.create(profile);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Hero profile created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<HeroProfile>> update(@PathVariable Long id, @Valid @RequestBody HeroProfile profile) {
        HeroProfile updated = heroProfileService.update(id, profile);
        return ResponseEntity.ok(ApiResponse.ok("Hero profile updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        heroProfileService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Hero profile deleted successfully", null));
    }
}
