package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.dto.PageResponse;
import com.example.crud.entity.RcDocument;
import com.example.crud.service.RcDocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rc-documents")
@RequiredArgsConstructor
public class RcDocumentController {

    private final RcDocumentService rcDocumentService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<RcDocument>>> getAll(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        PageResponse<RcDocument> result = rcDocumentService.getAll(search, category, status, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.ok("RC Documents retrieved successfully", result));
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<RcDocument>>> getActiveByCategory() {
        return ResponseEntity.ok(ApiResponse.ok("Active RC Documents retrieved", rcDocumentService.getActiveByCategory()));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<RcDocument>>> getAllList() {
        return ResponseEntity.ok(ApiResponse.ok("All RC Documents retrieved", rcDocumentService.getAllList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RcDocument>> getById(@PathVariable Long id) {
        RcDocument document = rcDocumentService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("RC Document retrieved successfully", document));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RcDocument>> create(@Valid @RequestBody RcDocument document) {
        RcDocument created = rcDocumentService.create(document);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("RC Document created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RcDocument>> update(@PathVariable Long id, @Valid @RequestBody RcDocument document) {
        RcDocument updated = rcDocumentService.update(id, document);
        return ResponseEntity.ok(ApiResponse.ok("RC Document updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        rcDocumentService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("RC Document deleted successfully", null));
    }
}
