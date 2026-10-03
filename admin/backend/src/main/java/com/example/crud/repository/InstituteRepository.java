package com.example.crud.repository;

import com.example.crud.entity.Institute;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InstituteRepository extends JpaRepository<Institute, Long> {
    Optional<Institute> findBySlug(String slug);
    Optional<Institute> findByCode(String code);

    @Query("SELECT i FROM Institute i WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(i.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(i.code) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(i.slug) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:status IS NULL OR :status = '' OR i.status = :status)")
    Page<Institute> findWithFilters(@Param("search") String search,
                                    @Param("status") String status,
                                    Pageable pageable);

    List<Institute> findAllByOrderBySortOrderAsc();

    long countByStatus(String status);
}
