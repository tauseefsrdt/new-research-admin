package com.example.crud.service;

import com.example.crud.entity.HeroProfile;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.HeroProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HeroProfileService {

    private final HeroProfileRepository heroProfileRepository;

    public List<HeroProfile> getAll() {
        return heroProfileRepository.findAll();
    }

    public HeroProfile getByKey(String key) {
        return heroProfileRepository.findByProfileKey(key)
                .orElseThrow(() -> new ResourceNotFoundException("Hero profile not found with key: " + key));
    }

    public HeroProfile getById(Long id) {
        return heroProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hero profile not found with id: " + id));
    }

    @Transactional
    public HeroProfile create(HeroProfile profile) {
        return heroProfileRepository.save(profile);
    }

    @Transactional
    public HeroProfile update(Long id, HeroProfile details) {
        HeroProfile profile = getById(id);
        profile.setProfileKey(details.getProfileKey());
        profile.setLabel(details.getLabel());
        profile.setTitle(details.getTitle());
        profile.setDesignation(details.getDesignation());
        profile.setImage(details.getImage());
        profile.setExcerpt(details.getExcerpt());
        profile.setFullContentJson(details.getFullContentJson());
        if (details.getStatus() != null) {
            profile.setStatus(details.getStatus());
        }
        return heroProfileRepository.save(profile);
    }

    @Transactional
    public void delete(Long id) {
        HeroProfile profile = getById(id);
        heroProfileRepository.delete(profile);
    }
}
