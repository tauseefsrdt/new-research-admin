package com.example.crud.service;

import com.example.crud.dto.CommonDtos;
import com.example.crud.dto.PageResponse;
import com.example.crud.entity.ResearchPaper;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.ResearchPaperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResearchPaperService {

    private final ResearchPaperRepository researchPaperRepository;

    public PageResponse<ResearchPaper> getAll(String search, String status, String department, String year, int page, int size, String sortBy, String sortDir) {
        Sort sort;
        if ("srNo".equalsIgnoreCase(sortBy) || "default".equalsIgnoreCase(sortBy) || sortBy == null || sortBy.isEmpty()) {
            sort = Sort.by(Sort.Order.asc("srNo").nullsFirst(), Sort.Order.desc("id"));
        } else {
            sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ResearchPaper> result = researchPaperRepository.findWithFilters(search, status, department, year, pageable);
        return PageResponse.of(result);
    }

    public List<ResearchPaper> getAllList() {
        return researchPaperRepository.findAll(Sort.by(Sort.Direction.ASC, "srNo"));
    }

    public ResearchPaper getById(Long id) {
        return researchPaperRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Research paper not found with id: " + id));
    }

    @Transactional
    public ResearchPaper create(ResearchPaper paper) {
        if (paper.getYear() == null && paper.getYearOfPublication() != null) {
            paper.setYear(paper.getYearOfPublication());
        }
        if (paper.getAuthors() == null && paper.getAuthorName() != null) {
            paper.setAuthors(paper.getAuthorName());
        }
        if (paper.getJournal() == null && paper.getJournalName() != null) {
            paper.setJournal(paper.getJournalName());
        }
        if (paper.getSrNo() == null) {
            paper.setSrNo(0);
        }
        return researchPaperRepository.save(paper);
    }

    @Transactional
    public ResearchPaper update(Long id, ResearchPaper details) {
        ResearchPaper paper = getById(id);
        paper.setSrNo(details.getSrNo());
        paper.setTitle(details.getTitle());
        paper.setAuthorName(details.getAuthorName());
        paper.setDepartment(details.getDepartment());
        paper.setJournalName(details.getJournalName());
        paper.setYearOfPublication(details.getYearOfPublication());
        paper.setIssnNumber(details.getIssnNumber());
        paper.setUgcRecognitionLink(details.getUgcRecognitionLink());
        paper.setAuthors(details.getAuthors() != null ? details.getAuthors() : details.getAuthorName());
        paper.setDepartmentKey(details.getDepartmentKey());
        paper.setJournal(details.getJournal() != null ? details.getJournal() : details.getJournalName());
        paper.setYear(details.getYear() != null ? details.getYear() : details.getYearOfPublication());
        paper.setAbstractText(details.getAbstractText());
        paper.setDoi(details.getDoi());
        paper.setFeatured(details.getFeatured());
        paper.setCitations(details.getCitations());
        if (details.getStatus() != null) {
            paper.setStatus(details.getStatus());
        }
        return researchPaperRepository.save(paper);
    }

    @Transactional
    public void delete(Long id) {
        ResearchPaper paper = getById(id);
        researchPaperRepository.delete(paper);
    }

    public List<ResearchPaper> getFeatured() {
        List<ResearchPaper> featured = researchPaperRepository.findByFeaturedTrue();
        if (featured.isEmpty()) {
            return researchPaperRepository.findAll(PageRequest.of(0, 3, Sort.by("id").ascending())).getContent();
        }
        return featured;
    }

    public List<CommonDtos.DepartmentCount> getDepartmentCounts() {
        List<ResearchPaper> papers = researchPaperRepository.findAll();
        Map<String, Long> countMap = papers.stream()
                .filter(p -> p.getDepartment() != null && !p.getDepartment().trim().isEmpty())
                .collect(Collectors.groupingBy(p -> p.getDepartment().trim(), Collectors.counting()));

        return countMap.entrySet().stream()
                .sorted((a, b) -> Long.compare(b.getValue(), a.getValue()))
                .map(e -> CommonDtos.DepartmentCount.builder()
                        .key(e.getKey())
                        .name(e.getKey())
                        .count(e.getValue())
                        .build())
                .collect(Collectors.toList());
    }
}
