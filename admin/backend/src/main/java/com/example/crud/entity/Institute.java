package com.example.crud.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "institutes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Institute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 100)
    private String code;

    @Column(name = "department_count_label", length = 100)
    private String departmentCountLabel;

    @Column(length = 500)
    private String image;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "programs_json", columnDefinition = "TEXT")
    private String programsJson;

    @Column(name = "phd_yearwise_dept_codes_json", columnDefinition = "TEXT")
    private String phdYearwiseDeptCodesJson;

    @Column(name = "paper_codes_json", columnDefinition = "TEXT")
    private String paperCodesJson;

    @Column(name = "patent_codes_json", columnDefinition = "TEXT")
    private String patentCodesJson;

    @Column(name = "book_codes_json", columnDefinition = "TEXT")
    private String bookCodesJson;

    @Column(name = "sort_order")
    @Builder.Default
    private Integer sortOrder = 0;

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
