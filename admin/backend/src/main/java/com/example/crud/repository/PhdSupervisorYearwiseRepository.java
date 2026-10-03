package com.example.crud.repository;

import com.example.crud.entity.PhdSupervisorYearwise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhdSupervisorYearwiseRepository extends JpaRepository<PhdSupervisorYearwise, Long> {

    @Query("SELECT p FROM PhdSupervisorYearwise p WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(p.supervisor) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.departmentName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.departmentCode) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:deptCode IS NULL OR :deptCode = '' OR :deptCode = 'All' OR p.departmentCode = :deptCode) AND " +
           "(:instituteSlug IS NULL OR :instituteSlug = '' OR :instituteSlug = 'All' OR p.instituteSlug = :instituteSlug) AND " +
           "(:status IS NULL OR :status = '' OR p.status = :status)")
    Page<PhdSupervisorYearwise> findWithFilters(@Param("search") String search,
                                                @Param("deptCode") String deptCode,
                                                @Param("instituteSlug") String instituteSlug,
                                                @Param("status") String status,
                                                Pageable pageable);

    List<PhdSupervisorYearwise> findByInstituteSlug(String instituteSlug);

    long countByStatus(String status);
}
