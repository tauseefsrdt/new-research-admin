package com.example.crud.service;

import com.example.crud.dto.PageResponse;
import com.example.crud.entity.Patent;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.PatentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatentService {

    private final PatentRepository patentRepository;
    private final FileUploadService fileUploadService;

    public PageResponse<Patent> getAll(String search, String status, String year, int page, int size, String sortBy, String sortDir) {
        Sort sort;
        if ("srNo".equalsIgnoreCase(sortBy) || "default".equalsIgnoreCase(sortBy) || sortBy == null || sortBy.isEmpty()) {
            sort = Sort.by(Sort.Order.asc("srNo").nullsFirst(), Sort.Order.desc("id"));
        } else {
            sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Patent> result = patentRepository.findWithFilters(search, status, year, pageable);
        return PageResponse.of(result);
    }

    public List<Patent> getAllList() {
        return patentRepository.findAll(Sort.by(Sort.Direction.ASC, "srNo"));
    }

    public Patent getById(Long id) {
        return patentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patent not found with id: " + id));
    }

    @Transactional
    public Patent create(Patent patent) {
        if (patent.getSrNo() == null) {
            patent.setSrNo(0);
        }
        if (patent.getYear() == null && patent.getYearOfAward() != null) {
            patent.setYear(patent.getYearOfAward());
        }
        if (patent.getAuthors() == null && patent.getPatenterName() != null) {
            patent.setAuthors(patent.getPatenterName());
        }
        return patentRepository.save(patent);
    }

    @Transactional
    public Patent update(Long id, Patent patentDetails) {
        Patent patent = getById(id);

        String oldPdf = patent.getPdf();
        String oldPdfUrl = patent.getPdfUrl();

        patent.setSrNo(patentDetails.getSrNo());
        patent.setPatenterName(patentDetails.getPatenterName());
        patent.setPatentNumber(patentDetails.getPatentNumber());
        patent.setTitle(patentDetails.getTitle());
        patent.setYearOfAward(patentDetails.getYearOfAward());
        patent.setAuthors(patentDetails.getAuthors() != null ? patentDetails.getAuthors() : patentDetails.getPatenterName());
        patent.setYear(patentDetails.getYear() != null ? patentDetails.getYear() : patentDetails.getYearOfAward());
        patent.setAbstractText(patentDetails.getAbstractText());
        patent.setFeatured(patentDetails.getFeatured());
        patent.setCitations(patentDetails.getCitations());
        patent.setDoi(patentDetails.getDoi());
        patent.setPdf(patentDetails.getPdf());
        patent.setPdfUrl(patentDetails.getPdfUrl());
        patent.setDepartmentKey(patentDetails.getDepartmentKey());
        if (patentDetails.getStatus() != null) {
            patent.setStatus(patentDetails.getStatus());
        }

        // Clean up old file if changed
        if (oldPdf != null && !oldPdf.equals(patentDetails.getPdf())) {
            fileUploadService.deleteOldFileIfInternal(oldPdf);
        }
        if (oldPdfUrl != null && !oldPdfUrl.equals(patentDetails.getPdfUrl())) {
            fileUploadService.deleteOldFileIfInternal(oldPdfUrl);
        }

        return patentRepository.save(patent);
    }

    @Transactional
    public void delete(Long id) {
        Patent patent = getById(id);
        if (patent.getPdf() != null) {
            fileUploadService.deleteOldFileIfInternal(patent.getPdf());
        }
        if (patent.getPdfUrl() != null) {
            fileUploadService.deleteOldFileIfInternal(patent.getPdfUrl());
        }
        patentRepository.delete(patent);
    }

    public List<Patent> getFeatured() {
        List<Patent> featured = patentRepository.findByFeaturedTrue();
        if (featured.isEmpty()) {
            return patentRepository.findAll(PageRequest.of(0, 3, Sort.by("id").ascending())).getContent();
        }
        return featured;
    }
}
