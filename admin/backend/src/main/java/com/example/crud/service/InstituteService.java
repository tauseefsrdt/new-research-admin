package com.example.crud.service;

import com.example.crud.dto.PageResponse;
import com.example.crud.entity.Institute;
import com.example.crud.exception.BadRequestException;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.InstituteRepository;
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
public class InstituteService {

    private final InstituteRepository instituteRepository;

    public PageResponse<Institute> getAll(String search, String status, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Institute> result = instituteRepository.findWithFilters(search, status, pageable);
        return PageResponse.of(result);
    }

    public List<Institute> getAllList() {
        return instituteRepository.findAllByOrderBySortOrderAsc();
    }

    public Institute getById(Long id) {
        return instituteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Institute not found with id: " + id));
    }

    public Institute getBySlug(String slug) {
        return instituteRepository.findBySlug(slug)
                .or(() -> instituteRepository.findByCode(slug.toUpperCase()))
                .orElseThrow(() -> new ResourceNotFoundException("Institute not found with slug or code: " + slug));
    }

    @Transactional
    public Institute create(Institute institute) {
        if (institute.getSlug() == null || institute.getSlug().trim().isEmpty()) {
            institute.setSlug(institute.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-"));
        }
        if (instituteRepository.findBySlug(institute.getSlug()).isPresent()) {
            throw new BadRequestException("Institute with slug '" + institute.getSlug() + "' already exists");
        }
        return instituteRepository.save(institute);
    }

    @Transactional
    public Institute update(Long id, Institute details) {
        Institute institute = getById(id);
        if (details.getSlug() != null && !details.getSlug().equals(institute.getSlug())) {
            instituteRepository.findBySlug(details.getSlug()).ifPresent(existing -> {
                if (!existing.getId().equals(id)) {
                    throw new BadRequestException("Slug '" + details.getSlug() + "' already in use");
                }
            });
            institute.setSlug(details.getSlug());
        }
        institute.setTitle(details.getTitle());
        institute.setCode(details.getCode());
        institute.setDepartmentCountLabel(details.getDepartmentCountLabel());
        institute.setImage(details.getImage());
        institute.setDescription(details.getDescription());
        institute.setProgramsJson(details.getProgramsJson());
        institute.setPaperCodesJson(details.getPaperCodesJson());
        institute.setPatentCodesJson(details.getPatentCodesJson());
        institute.setBookCodesJson(details.getBookCodesJson());
        institute.setPhdYearwiseDeptCodesJson(details.getPhdYearwiseDeptCodesJson());
        institute.setSortOrder(details.getSortOrder());
        if (details.getStatus() != null) {
            institute.setStatus(details.getStatus());
        }
        return instituteRepository.save(institute);
    }

    @Transactional
    public void delete(Long id) {
        Institute institute = getById(id);
        instituteRepository.delete(institute);
    }
}
