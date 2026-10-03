package com.example.crud.service;

import com.example.crud.dto.PageResponse;
import com.example.crud.entity.Leadership;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.LeadershipRepository;
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
public class LeadershipService {

    private final LeadershipRepository leadershipRepository;

    public PageResponse<Leadership> getAll(String search, String status, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Leadership> result = leadershipRepository.findWithFilters(search, status, pageable);
        return PageResponse.of(result);
    }

    public List<Leadership> getActiveList() {
        return leadershipRepository.findByStatusOrderBySortOrderAsc("ACTIVE");
    }

    public Leadership getById(Long id) {
        return leadershipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leadership record not found with id: " + id));
    }

    @Transactional
    public Leadership create(Leadership leadership) {
        return leadershipRepository.save(leadership);
    }

    @Transactional
    public Leadership update(Long id, Leadership details) {
        Leadership leadership = getById(id);
        leadership.setName(details.getName());
        leadership.setRole(details.getRole());
        leadership.setEmail(details.getEmail());
        leadership.setTag(details.getTag());
        leadership.setImage(details.getImage());
        leadership.setInstitution(details.getInstitution());
        leadership.setSortOrder(details.getSortOrder());
        if (details.getStatus() != null) {
            leadership.setStatus(details.getStatus());
        }
        return leadershipRepository.save(leadership);
    }

    @Transactional
    public void delete(Long id) {
        Leadership leadership = getById(id);
        leadershipRepository.delete(leadership);
    }
}
