package com.example.crud.repository;

import com.example.crud.entity.ThesisAwarded;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThesisAwardedRepository extends JpaRepository<ThesisAwarded, Long> {

    @Query("SELECT t FROM ThesisAwarded t WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(t.scholarName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.regNo) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.supervisors) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.institute) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.department) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:institute IS NULL OR :institute = '' OR :institute = 'All' OR LOWER(t.institute) LIKE LOWER(CONCAT('%', :institute, '%'))) AND " +
           "(:department IS NULL OR :department = '' OR :department = 'All' OR LOWER(t.department) LIKE LOWER(CONCAT('%', :department, '%'))) AND " +
           "(:session IS NULL OR :session = '' OR :session = 'All' OR t.academicSession = :session) AND " +
           "(:status IS NULL OR :status = '' OR t.status = :status)")
    Page<ThesisAwarded> findWithFilters(@Param("search") String search,
                                        @Param("institute") String institute,
                                        @Param("department") String department,
                                        @Param("session") String session,
                                        @Param("status") String status,
                                        Pageable pageable);

    long countByStatus(String status);
}
