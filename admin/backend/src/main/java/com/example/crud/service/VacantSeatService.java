package com.example.crud.service;

import com.example.crud.dto.PageResponse;
import com.example.crud.entity.VacantSeat;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.VacantSeatRepository;
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
public class VacantSeatService {

    private final VacantSeatRepository vacantSeatRepository;

    public PageResponse<VacantSeat> getAll(String search, String institute, String department, String status, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<VacantSeat> result = vacantSeatRepository.findWithFilters(search, institute, department, status, pageable);
        return PageResponse.of(result);
    }

    public List<VacantSeat> getAllList() {
        return vacantSeatRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public List<VacantSeat> getByInstitute(String institute) {
        return vacantSeatRepository.findByInstituteContainingIgnoreCase(institute);
    }

    public VacantSeat getById(Long id) {
        return vacantSeatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vacant seat record not found with id: " + id));
    }

    @Transactional
    public VacantSeat create(VacantSeat seat) {
        if (seat.getNoOfVacant() == null && seat.getDesignationSeatLimit() != null && seat.getAllottedSeat() != null) {
            seat.setNoOfVacant(Math.max(0, seat.getDesignationSeatLimit() - seat.getAllottedSeat()));
        }
        return vacantSeatRepository.save(seat);
    }

    @Transactional
    public VacantSeat update(Long id, VacantSeat details) {
        VacantSeat seat = getById(id);
        seat.setRowIndex(details.getRowIndex());
        seat.setInstitute(details.getInstitute());
        seat.setRawInstitute(details.getRawInstitute());
        seat.setDepartment(details.getDepartment());
        seat.setRawDepartment(details.getRawDepartment());
        seat.setTotalPhD(details.getTotalPhD());
        seat.setRawTotalPhD(details.getRawTotalPhD());
        seat.setSupervisorName(details.getSupervisorName());
        seat.setRawSupervisorName(details.getRawSupervisorName());
        seat.setDesignation(details.getDesignation());
        seat.setRawDesignation(details.getRawDesignation());
        seat.setDesignationSeatLimit(details.getDesignationSeatLimit());
        seat.setAllottedSeat(details.getAllottedSeat());
        if (details.getNoOfVacant() != null) {
            seat.setNoOfVacant(details.getNoOfVacant());
        } else if (details.getDesignationSeatLimit() != null && details.getAllottedSeat() != null) {
            seat.setNoOfVacant(Math.max(0, details.getDesignationSeatLimit() - details.getAllottedSeat()));
        }
        if (details.getStatus() != null) {
            seat.setStatus(details.getStatus());
        }
        return vacantSeatRepository.save(seat);
    }

    @Transactional
    public void delete(Long id) {
        VacantSeat seat = getById(id);
        vacantSeatRepository.delete(seat);
    }
}
