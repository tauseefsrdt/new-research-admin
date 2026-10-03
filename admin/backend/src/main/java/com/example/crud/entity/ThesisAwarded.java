package com.example.crud.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "theses_awarded")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThesisAwarded {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sr_no")
    private Integer srNo;

    @Column(name = "raw_faculty_institute", columnDefinition = "TEXT")
    private String rawFacultyInstitute;

    @Column(columnDefinition = "TEXT")
    private String institute;

    @Column(columnDefinition = "TEXT")
    private String department;

    @Column(name = "scholar_name", columnDefinition = "TEXT")
    private String scholarName;

    @Column(name = "reg_no", columnDefinition = "TEXT")
    private String regNo;

    @Column(name = "scholar_with_reg", columnDefinition = "TEXT")
    private String scholarWithReg;

    @Column(columnDefinition = "TEXT")
    private String supervisors;

    @Column(columnDefinition = "LONGTEXT")
    private String title;

    @Column(name = "raw_title", columnDefinition = "LONGTEXT")
    private String rawTitle;

    @Column(name = "defense_date", length = 255)
    private String defenseDate;

    @Column(name = "academic_session", length = 255)
    private String academicSession;

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
