package com.example.crud.service;

import com.example.crud.dto.CommonDtos;
import com.example.crud.entity.Book;
import com.example.crud.entity.Patent;
import com.example.crud.entity.ResearchPaper;
import com.example.crud.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final PatentRepository patentRepository;
    private final ResearchPaperRepository researchPaperRepository;
    private final BookRepository bookRepository;
    private final InstituteRepository instituteRepository;
    private final VacantSeatRepository vacantSeatRepository;
    private final ThesisAwardedRepository thesisAwardedRepository;
    private final PhdSupervisorYearwiseRepository phdSupervisorYearwiseRepository;
    private final RcDocumentRepository rcDocumentRepository;

    public CommonDtos.DashboardStats getStats() {
        long totalPatents = patentRepository.count();
        long totalResearchPapers = researchPaperRepository.count();
        long totalBooks = bookRepository.count();
        long totalInstitutes = instituteRepository.count();
        long totalVacantSeats = vacantSeatRepository.count();
        long totalTheses = thesisAwardedRepository.count();
        long totalPhdSupervisors = phdSupervisorYearwiseRepository.count();
        long totalRcDocs = rcDocumentRepository.count();

        long activePatents = patentRepository.countByStatus("ACTIVE");
        long activePapers = researchPaperRepository.countByStatus("ACTIVE");
        long activeBooks = bookRepository.countByStatus("ACTIVE");

        // Calculate unique researchers from author names and inventor names
        Set<String> researchers = new HashSet<>();
        researchPaperRepository.findAll().forEach(p -> {
            if (p.getAuthorName() != null) {
                Arrays.stream(p.getAuthorName().split(","))
                        .map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .forEach(researchers::add);
            }
        });
        patentRepository.findAll().forEach(p -> {
            if (p.getPatenterName() != null) {
                Arrays.stream(p.getPatenterName().split(","))
                        .map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .forEach(researchers::add);
            }
        });

        List<Patent> recentPatents = patentRepository.findAll(PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "id"))).getContent();
        List<ResearchPaper> recentPapers = researchPaperRepository.findAll(PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "id"))).getContent();
        List<Book> recentBooks = bookRepository.findAll(PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "id"))).getContent();

        return CommonDtos.DashboardStats.builder()
                .totalPatents(totalPatents)
                .totalResearchPapers(totalResearchPapers)
                .totalBooks(totalBooks)
                .totalResearchers(researchers.size())
                .totalInstitutes(totalInstitutes)
                .totalVacantSeats(totalVacantSeats)
                .totalThesesAwarded(totalTheses)
                .totalPhdSupervisors(totalPhdSupervisors)
                .totalRcDocuments(totalRcDocs)
                .totalActivePatents(activePatents)
                .totalActiveResearchPapers(activePapers)
                .totalActiveBooks(activeBooks)
                .recentPatents(recentPatents)
                .recentPapers(recentPapers)
                .recentBooks(recentBooks)
                .build();
    }
}
