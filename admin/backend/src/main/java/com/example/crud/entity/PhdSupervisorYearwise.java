package com.example.crud.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "phd_supervisor_yearwise")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhdSupervisorYearwise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "department_code", length = 100)
    private String departmentCode;

    @Column(name = "department_name", length = 255)
    private String departmentName;

    @Column(name = "institute_slug", length = 150)
    private String instituteSlug;

    @Column(nullable = false, length = 255)
    private String supervisor;

    @Column(name = "yearly_json", columnDefinition = "TEXT")
    private String yearlyJson;

    @Column(name = "grand_total")
    @Builder.Default
    private Integer grandTotal = 0;

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
