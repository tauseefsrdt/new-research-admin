package com.example.crud.dto;

import com.example.crud.entity.Book;
import com.example.crud.entity.Patent;
import com.example.crud.entity.ResearchPaper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class CommonDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DashboardStats {
        private long totalPatents;
        private long totalResearchPapers;
        private long totalBooks;
        private long totalResearchers;
        private long totalInstitutes;
        private long totalVacantSeats;
        private long totalThesesAwarded;
        private long totalPhdSupervisors;
        private long totalRcDocuments;
        private long totalActivePatents;
        private long totalActiveResearchPapers;
        private long totalActiveBooks;
        private List<Patent> recentPatents;
        private List<ResearchPaper> recentPapers;
        private List<Book> recentBooks;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SearchResult {
        private List<Patent> papers; // Patents in website term
        private List<ResearchPaper> indexed;
        private List<Book> books;
        private long total;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DepartmentCount {
        private String key;
        private String name;
        private long count;
    }
}
