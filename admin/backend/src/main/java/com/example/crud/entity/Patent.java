package com.example.crud.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "patents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sr_no")
    private Integer srNo;

    @Column(name = "patenter_name", columnDefinition = "TEXT")
    private String patenterName;

    @Column(name = "patent_number", columnDefinition = "TEXT")
    private String patentNumber;

    @Column(columnDefinition = "TEXT")
    private String title;

    @Column(name = "year_of_award", columnDefinition = "TEXT")
    private String yearOfAward;

    @Column(columnDefinition = "TEXT")
    private String authors;

    @Column(columnDefinition = "TEXT")
    private String year;

    @Column(columnDefinition = "LONGTEXT")
    private String abstractText;

    @Builder.Default
    private Boolean featured = false;

    @Builder.Default
    private Integer citations = 0;

    @Column(columnDefinition = "TEXT")
    private String doi;

    @Column(columnDefinition = "TEXT")
    private String pdf;

    @Column(name = "pdf_url", columnDefinition = "TEXT")
    private String pdfUrl;

    @Column(name = "department_key", columnDefinition = "TEXT")
    private String departmentKey;

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
