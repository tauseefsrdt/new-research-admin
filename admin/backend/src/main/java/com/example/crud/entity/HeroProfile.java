package com.example.crud.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "hero_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeroProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "profile_key", unique = true, nullable = false, length = 100)
    private String profileKey;

    @Column(length = 200)
    private String label;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 200)
    private String designation;

    @Column(length = 500)
    private String image;

    @Column(columnDefinition = "TEXT")
    private String excerpt;

    @Column(name = "full_content_json", columnDefinition = "LONGTEXT")
    private String fullContentJson;

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
