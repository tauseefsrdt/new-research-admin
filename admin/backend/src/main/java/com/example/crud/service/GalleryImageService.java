package com.example.crud.service;

import com.example.crud.dto.PageResponse;
import com.example.crud.entity.GalleryImage;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.GalleryImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GalleryImageService {

    private final GalleryImageRepository galleryImageRepository;

    public PageResponse<GalleryImage> getAll(String search, String category, String status, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<GalleryImage> result = galleryImageRepository.findWithFilters(search, category, status, pageable);
        return PageResponse.of(result);
    }

    public List<GalleryImage> getActiveList() {
        return galleryImageRepository.findByStatusOrderBySortOrderAsc("ACTIVE");
    }

    public GalleryImage getById(Long id) {
        return galleryImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery image not found with id: " + id));
    }

    @Transactional
    public GalleryImage create(GalleryImage image) {
        return galleryImageRepository.save(image);
    }

    @Transactional
    public GalleryImage update(Long id, GalleryImage details) {
        GalleryImage image = getById(id);
        image.setSrc(details.getSrc());
        image.setAlt(details.getAlt());
        image.setCaption(details.getCaption());
        image.setCategory(details.getCategory());
        image.setSortOrder(details.getSortOrder());
        if (details.getStatus() != null) {
            image.setStatus(details.getStatus());
        }
        return galleryImageRepository.save(image);
    }

    @Transactional
    public void delete(Long id) {
        GalleryImage image = getById(id);
        galleryImageRepository.delete(image);
    }
}
