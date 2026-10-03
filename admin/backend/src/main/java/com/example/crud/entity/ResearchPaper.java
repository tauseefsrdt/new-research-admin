package com.example.crud.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "research_papers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResearchPaper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sr_no")
    private Integer srNo;

    @Column(columnDefinition = "TEXT")
    private String title;

    @Column(name = "author_name", columnDefinition = "TEXT")
    private String authorName;

    @Column(columnDefinition = "TEXT")
    private String department;

    @Column(name = "journal_name", columnDefinition = "TEXT")
    private String journalName;

    @Column(name = "year_of_publication", columnDefinition = "TEXT")
    private String yearOfPublication;

    @Column(name = "issn_number", columnDefinition = "TEXT")
    private String issnNumber;

    @Column(name = "ugc_recognition_link", columnDefinition = "TEXT")
    private String ugcRecognitionLink;

    @Column(columnDefinition = "TEXT")
    private String authors;

    @Column(name = "department_key", columnDefinition = "TEXT")
    private String departmentKey;

    @Column(columnDefinition = "TEXT")
    private String journal;

    @Column(columnDefinition = "TEXT")
    private String year;

    @Column(columnDefinition = "LONGTEXT")
    private String abstractText;

    @Column(columnDefinition = "TEXT")
    private String doi;

    @Builder.Default
    private Boolean featured = false;

    @Builder.Default
    private Integer citations = 0;

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
