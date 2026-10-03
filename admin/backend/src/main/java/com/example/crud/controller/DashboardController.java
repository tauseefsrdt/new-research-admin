package com.example.crud.controller;

import com.example.crud.dto.ApiResponse;
import com.example.crud.dto.CommonDtos;
import com.example.crud.service.DashboardService;
import com.example.crud.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final SearchService searchService;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<ApiResponse<CommonDtos.DashboardStats>> getDashboardStats() {
        CommonDtos.DashboardStats stats = dashboardService.getStats();
        return ResponseEntity.ok(ApiResponse.ok("Dashboard stats retrieved", stats));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<CommonDtos.SearchResult>> search(
            @RequestParam(value = "q", required = false) String q,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "search", required = false) String search
    ) {
        String query = q != null ? q : (keyword != null ? keyword : (search != null ? search : ""));
        CommonDtos.SearchResult results = searchService.globalSearch(query);
        return ResponseEntity.ok(ApiResponse.ok("Search results retrieved", results));
    }
}
