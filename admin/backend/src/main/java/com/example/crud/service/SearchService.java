package com.example.crud.service;

import com.example.crud.dto.CommonDtos;
import com.example.crud.entity.Book;
import com.example.crud.entity.Patent;
import com.example.crud.entity.ResearchPaper;
import com.example.crud.repository.BookRepository;
import com.example.crud.repository.PatentRepository;
import com.example.crud.repository.ResearchPaperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final PatentRepository patentRepository;
    private final ResearchPaperRepository researchPaperRepository;
    private final BookRepository bookRepository;

    public CommonDtos.SearchResult globalSearch(String query) {
        if (query == null || query.trim().isEmpty()) {
            return CommonDtos.SearchResult.builder()
                    .papers(Collections.emptyList())
                    .indexed(Collections.emptyList())
                    .books(Collections.emptyList())
                    .total(0)
                    .build();
        }

        List<Patent> matchedPatents = patentRepository.findWithFilters(query, null, null, PageRequest.of(0, 10)).getContent();
        List<ResearchPaper> matchedPapers = researchPaperRepository.findWithFilters(query, null, null, null, PageRequest.of(0, 10)).getContent();
        List<Book> matchedBooks = bookRepository.findWithFilters(query, null, null, PageRequest.of(0, 10)).getContent();

        long total = matchedPatents.size() + matchedPapers.size() + matchedBooks.size();

        return CommonDtos.SearchResult.builder()
                .papers(matchedPatents)
                .indexed(matchedPapers)
                .books(matchedBooks)
                .total(total)
                .build();
    }
}
