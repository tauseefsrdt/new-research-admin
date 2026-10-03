package com.example.crud.repository;

import com.example.crud.entity.Patron;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatronRepository extends JpaRepository<Patron, Long> {

    @Query("SELECT p FROM Patron p WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.role) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:type IS NULL OR :type = '' OR :type = 'All' OR p.type = :type) AND " +
           "(:status IS NULL OR :status = '' OR p.status = :status)")
    Page<Patron> findWithFilters(@Param("search") String search,
                                 @Param("type") String type,
                                 @Param("status") String status,
                                 Pageable pageable);

    List<Patron> findByTypeAndStatusOrderBySortOrderAsc(String type, String status);

    long countByStatus(String status);
}
