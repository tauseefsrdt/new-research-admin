package com.example.crud.repository;

import com.example.crud.entity.ResearchPaper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResearchPaperRepository extends JpaRepository<ResearchPaper, Long> {

    @Query("SELECT r FROM ResearchPaper r WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(r.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.authorName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.journalName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.department) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.issnNumber) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:status IS NULL OR :status = '' OR r.status = :status) AND " +
           "(:department IS NULL OR :department = '' OR :department = 'All' OR LOWER(r.department) = LOWER(:department)) AND " +
           "(:year IS NULL OR :year = '' OR :year = 'All' OR r.yearOfPublication LIKE CONCAT('%', :year, '%'))")
    Page<ResearchPaper> findWithFilters(@Param("search") String search,
                                        @Param("status") String status,
                                        @Param("department") String department,
                                        @Param("year") String year,
                                        Pageable pageable);

    List<ResearchPaper> findByFeaturedTrue();

    long countByStatus(String status);
}
