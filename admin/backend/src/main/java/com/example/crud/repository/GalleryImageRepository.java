package com.example.crud.repository;

import com.example.crud.entity.GalleryImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryImageRepository extends JpaRepository<GalleryImage, Long> {

    @Query("SELECT g FROM GalleryImage g WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(g.alt) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(g.caption) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:category IS NULL OR :category = '' OR :category = 'All' OR g.category = :category) AND " +
           "(:status IS NULL OR :status = '' OR g.status = :status)")
    Page<GalleryImage> findWithFilters(@Param("search") String search,
                                       @Param("category") String category,
                                       @Param("status") String status,
                                       Pageable pageable);

    List<GalleryImage> findByStatusOrderBySortOrderAsc(String status);

    long countByStatus(String status);
}
