package com.example.crud.repository;

import com.example.crud.entity.VacantSeat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VacantSeatRepository extends JpaRepository<VacantSeat, Long> {

    @Query("SELECT v FROM VacantSeat v WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(v.supervisorName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(v.institute) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(v.department) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(v.designation) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:institute IS NULL OR :institute = '' OR :institute = 'All' OR LOWER(v.institute) LIKE LOWER(CONCAT('%', :institute, '%'))) AND " +
           "(:department IS NULL OR :department = '' OR :department = 'All' OR LOWER(v.department) LIKE LOWER(CONCAT('%', :department, '%'))) AND " +
           "(:status IS NULL OR :status = '' OR v.status = :status)")
    Page<VacantSeat> findWithFilters(@Param("search") String search,
                                     @Param("institute") String institute,
                                     @Param("department") String department,
                                     @Param("status") String status,
                                     Pageable pageable);

    List<VacantSeat> findByInstituteContainingIgnoreCase(String institute);

    long countByStatus(String status);
}
