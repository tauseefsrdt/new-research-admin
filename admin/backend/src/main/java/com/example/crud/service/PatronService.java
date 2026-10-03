package com.example.crud.service;

import com.example.crud.dto.PageResponse;
import com.example.crud.entity.Patron;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.PatronRepository;
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
public class PatronService {

    private final PatronRepository patronRepository;

    public PageResponse<Patron> getAll(String search, String type, String status, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Patron> result = patronRepository.findWithFilters(search, type, status, pageable);
        return PageResponse.of(result);
    }

    public List<Patron> getByType(String type) {
        return patronRepository.findByTypeAndStatusOrderBySortOrderAsc(type, "ACTIVE");
    }

    public Patron getById(Long id) {
        return patronRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patron not found with id: " + id));
    }

    @Transactional
    public Patron create(Patron patron) {
        return patronRepository.save(patron);
    }

    @Transactional
    public Patron update(Long id, Patron details) {
        Patron patron = getById(id);
        patron.setName(details.getName());
        patron.setRole(details.getRole());
        patron.setImage(details.getImage());
        patron.setType(details.getType());
        patron.setSortOrder(details.getSortOrder());
        if (details.getStatus() != null) {
            patron.setStatus(details.getStatus());
        }
        return patronRepository.save(patron);
    }

    @Transactional
    public void delete(Long id) {
        Patron patron = getById(id);
        patronRepository.delete(patron);
    }
}
