package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.dto.PageResponse;
import com.example.crud.entity.Book;
import com.example.crud.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Book>>> getAll(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "year", required = false) String year,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "slNo") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        PageResponse<Book> result = bookService.getAll(search, status, year, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.ok("Books retrieved successfully", result));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Book>>> getAllList() {
        return ResponseEntity.ok(ApiResponse.ok("All books retrieved", bookService.getAllList()));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<Book>>> getFeatured() {
        return ResponseEntity.ok(ApiResponse.ok("Featured books retrieved", bookService.getFeatured()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Book>> getById(@PathVariable Long id) {
        Book book = bookService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("Book retrieved successfully", book));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Book>> create(@Valid @RequestBody Book book) {
        Book created = bookService.create(book);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Book created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Book>> update(@PathVariable Long id, @Valid @RequestBody Book book) {
        Book updated = bookService.update(id, book);
        return ResponseEntity.ok(ApiResponse.ok("Book updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        bookService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Book deleted successfully", null));
    }
}
