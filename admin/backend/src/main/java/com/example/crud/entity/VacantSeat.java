package com.example.crud.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "vacant_seats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VacantSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "row_index")
    private Integer rowIndex;

    @Column(columnDefinition = "TEXT")
    private String institute;

    @Column(name = "raw_institute", columnDefinition = "TEXT")
    private String rawInstitute;

    @Column(columnDefinition = "TEXT")
    private String department;

    @Column(name = "raw_department", columnDefinition = "TEXT")
    private String rawDepartment;

    @Column(name = "total_phd")
    private Integer totalPhD;

    @Column(name = "raw_total_phd")
    private Integer rawTotalPhD;

    @Column(name = "supervisor_name", columnDefinition = "TEXT")
    private String supervisorName;

    @Column(name = "raw_supervisor_name", columnDefinition = "TEXT")
    private String rawSupervisorName;

    @Column(columnDefinition = "TEXT")
    private String designation;

    @Column(name = "raw_designation", columnDefinition = "TEXT")
    private String rawDesignation;

    @Column(name = "designation_seat_limit")
    private Integer designationSeatLimit;

    @Column(name = "allotted_seat")
    private Integer allottedSeat;

    @Column(name = "no_of_vacant")
    private Integer noOfVacant;

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
