package com.example.crud.repository;

import com.example.crud.entity.RcDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RcDocumentRepository extends JpaRepository<RcDocument, Long> {
    Optional<RcDocument> findByDocKey(String docKey);

    @Query("SELECT d FROM RcDocument d WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(d.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(d.filename) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(d.description) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:category IS NULL OR :category = '' OR :category = 'All' OR d.category = :category) AND " +
           "(:status IS NULL OR :status = '' OR d.status = :status)")
    Page<RcDocument> findWithFilters(@Param("search") String search,
                                     @Param("category") String category,
                                     @Param("status") String status,
                                     Pageable pageable);

    List<RcDocument> findByStatusOrderByCategoryAsc(String status);

    long countByStatus(String status);
}
