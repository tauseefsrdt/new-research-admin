package com.example.crud.repository;

import com.example.crud.entity.HeroProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HeroProfileRepository extends JpaRepository<HeroProfile, Long> {
    Optional<HeroProfile> findByProfileKey(String profileKey);
    long countByStatus(String status);
}
