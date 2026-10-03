package com.example.crud.repository;

import com.example.crud.entity.Leadership;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadershipRepository extends JpaRepository<Leadership, Long> {

    @Query("SELECT l FROM Leadership l WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(l.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(l.role) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(l.email) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:status IS NULL OR :status = '' OR l.status = :status)")
    Page<Leadership> findWithFilters(@Param("search") String search,
                                     @Param("status") String status,
                                     Pageable pageable);

    List<Leadership> findByStatusOrderBySortOrderAsc(String status);

    long countByStatus(String status);
}
