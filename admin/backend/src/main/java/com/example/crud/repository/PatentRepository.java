package com.example.crud.repository;

import com.example.crud.entity.Patent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatentRepository extends JpaRepository<Patent, Long> {

    @Query("SELECT p FROM Patent p WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.patenterName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.patentNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.yearOfAward) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:status IS NULL OR :status = '' OR p.status = :status) AND " +
           "(:year IS NULL OR :year = '' OR :year = 'All' OR p.yearOfAward LIKE CONCAT('%', :year, '%'))")
    Page<Patent> findWithFilters(@Param("search") String search,
                                 @Param("status") String status,
                                 @Param("year") String year,
                                 Pageable pageable);

    List<Patent> findByFeaturedTrue();

    long countByStatus(String status);
}
