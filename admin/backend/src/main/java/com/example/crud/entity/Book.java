package com.example.crud.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sl_no")
    private Integer slNo;

    @Column(name = "teacher_name", columnDefinition = "TEXT")
    private String teacherName;

    @Column(name = "book_or_chapter_title", columnDefinition = "LONGTEXT")
    private String bookOrChapterTitle;

    @Column(name = "paper_title", columnDefinition = "LONGTEXT")
    private String paperTitle;

    @Column(name = "conference_proceeding_title", columnDefinition = "LONGTEXT")
    private String conferenceProceedingTitle;

    @Column(name = "conference_name", columnDefinition = "LONGTEXT")
    private String conferenceName;

    @Column(columnDefinition = "TEXT")
    private String scope;

    @Column(name = "year_of_publication", columnDefinition = "TEXT")
    private String yearOfPublication;

    @Column(name = "isbn_issn", columnDefinition = "TEXT")
    private String isbnIssn;

    @Column(name = "affiliating_institute", columnDefinition = "TEXT")
    private String affiliatingInstitute;

    @Column(name = "publisher_name", columnDefinition = "TEXT")
    private String publisherName;

    @Column(columnDefinition = "LONGTEXT")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String authors;

    @Column(columnDefinition = "TEXT")
    private String year;

    @Column(columnDefinition = "TEXT")
    private String publisher;

    @Column(columnDefinition = "LONGTEXT")
    private String abstractText;

    @Column(columnDefinition = "TEXT")
    private String isbn;

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String status = "ACTIVE";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
