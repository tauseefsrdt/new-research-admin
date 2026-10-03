package com.example.crud.repository;

import com.example.crud.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(b.teacherName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.bookOrChapterTitle) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.paperTitle) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.publisherName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.isbnIssn) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:status IS NULL OR :status = '' OR b.status = :status) AND " +
           "(:year IS NULL OR :year = '' OR :year = 'All' OR b.yearOfPublication LIKE CONCAT('%', :year, '%'))")
    Page<Book> findWithFilters(@Param("search") String search,
                               @Param("status") String status,
                               @Param("year") String year,
                               Pageable pageable);

    long countByStatus(String status);
}
