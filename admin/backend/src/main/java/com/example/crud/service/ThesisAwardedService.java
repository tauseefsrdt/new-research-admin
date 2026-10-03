package com.example.crud.service;

import com.example.crud.dto.PageResponse;
import com.example.crud.entity.ThesisAwarded;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.ThesisAwardedRepository;
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
public class ThesisAwardedService {

    private final ThesisAwardedRepository thesisAwardedRepository;

    public PageResponse<ThesisAwarded> getAll(String search, String institute, String department, String session, String status, int page, int size, String sortBy, String sortDir) {
        Sort sort;
        if ("srNo".equalsIgnoreCase(sortBy) || "default".equalsIgnoreCase(sortBy) || sortBy == null || sortBy.isEmpty()) {
            sort = Sort.by(Sort.Order.asc("srNo").nullsFirst(), Sort.Order.desc("id"));
        } else {
            sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ThesisAwarded> result = thesisAwardedRepository.findWithFilters(search, institute, department, session, status, pageable);
        return PageResponse.of(result);
    }

    public List<ThesisAwarded> getAllList() {
        return thesisAwardedRepository.findAll(Sort.by(Sort.Direction.ASC, "srNo"));
    }

    public ThesisAwarded getById(Long id) {
        return thesisAwardedRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Thesis awarded record not found with id: " + id));
    }

    @Transactional
    public ThesisAwarded create(ThesisAwarded thesis) {
        if (thesis.getSrNo() == null) {
            thesis.setSrNo(0);
        }
        if (thesis.getScholarWithReg() == null && thesis.getScholarName() != null) {
            thesis.setScholarWithReg(thesis.getScholarName() + (thesis.getRegNo() != null ? " (" + thesis.getRegNo() + ")" : ""));
        }
        if (thesis.getRawTitle() == null && thesis.getTitle() != null) {
            thesis.setRawTitle(thesis.getTitle());
        }
        return thesisAwardedRepository.save(thesis);
    }

    @Transactional
    public ThesisAwarded update(Long id, ThesisAwarded details) {
        ThesisAwarded thesis = getById(id);
        thesis.setSrNo(details.getSrNo());
        thesis.setRawFacultyInstitute(details.getRawFacultyInstitute());
        thesis.setInstitute(details.getInstitute());
        thesis.setDepartment(details.getDepartment());
        thesis.setScholarName(details.getScholarName());
        thesis.setRegNo(details.getRegNo());
        thesis.setScholarWithReg(details.getScholarWithReg() != null ? details.getScholarWithReg() : (details.getScholarName() + (details.getRegNo() != null ? " (" + details.getRegNo() + ")" : "")));
        thesis.setSupervisors(details.getSupervisors());
        thesis.setTitle(details.getTitle());
        thesis.setRawTitle(details.getRawTitle() != null ? details.getRawTitle() : details.getTitle());
        thesis.setDefenseDate(details.getDefenseDate());
        thesis.setAcademicSession(details.getAcademicSession());
        if (details.getStatus() != null) {
            thesis.setStatus(details.getStatus());
        }
        return thesisAwardedRepository.save(thesis);
    }

    @Transactional
    public void delete(Long id) {
        ThesisAwarded thesis = getById(id);
        thesisAwardedRepository.delete(thesis);
    }
}
