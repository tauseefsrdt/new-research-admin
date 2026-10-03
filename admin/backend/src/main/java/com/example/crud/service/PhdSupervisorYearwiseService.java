package com.example.crud.service;

import com.example.crud.dto.PageResponse;
import com.example.crud.entity.PhdSupervisorYearwise;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.PhdSupervisorYearwiseRepository;
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
public class PhdSupervisorYearwiseService {

    private final PhdSupervisorYearwiseRepository repository;

    public PageResponse<PhdSupervisorYearwise> getAll(String search, String deptCode, String instituteSlug, String status, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<PhdSupervisorYearwise> result = repository.findWithFilters(search, deptCode, instituteSlug, status, pageable);
        return PageResponse.of(result);
    }

    public List<PhdSupervisorYearwise> getAllList() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public List<PhdSupervisorYearwise> getByInstitute(String instituteSlug) {
        return repository.findByInstituteSlug(instituteSlug);
    }

    public PhdSupervisorYearwise getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PhD supervisor record not found with id: " + id));
    }

    @Transactional
    public PhdSupervisorYearwise create(PhdSupervisorYearwise record) {
        return repository.save(record);
    }

    @Transactional
    public PhdSupervisorYearwise update(Long id, PhdSupervisorYearwise details) {
        PhdSupervisorYearwise record = getById(id);
        record.setDepartmentCode(details.getDepartmentCode());
        record.setDepartmentName(details.getDepartmentName());
        record.setInstituteSlug(details.getInstituteSlug());
        record.setSupervisor(details.getSupervisor());
        record.setYearlyJson(details.getYearlyJson());
        record.setGrandTotal(details.getGrandTotal());
        if (details.getStatus() != null) {
            record.setStatus(details.getStatus());
        }
        return repository.save(record);
    }

    @Transactional
    public void delete(Long id) {
        PhdSupervisorYearwise record = getById(id);
        repository.delete(record);
    }
}
