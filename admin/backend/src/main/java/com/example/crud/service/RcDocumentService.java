package com.example.crud.service;

import com.example.crud.dto.PageResponse;
import com.example.crud.entity.RcDocument;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.RcDocumentRepository;
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
public class RcDocumentService {

    private final RcDocumentRepository rcDocumentRepository;
    private final FileUploadService fileUploadService;

    public PageResponse<RcDocument> getAll(String search, String category, String status, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<RcDocument> result = rcDocumentRepository.findWithFilters(search, category, status, pageable);
        return PageResponse.of(result);
    }

    public List<RcDocument> getActiveByCategory() {
        return rcDocumentRepository.findByStatusOrderByCategoryAsc("ACTIVE");
    }

    public List<RcDocument> getAllList() {
        return rcDocumentRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public RcDocument getById(Long id) {
        return rcDocumentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RC Document not found with id: " + id));
    }

    @Transactional
    public RcDocument create(RcDocument document) {
        if (document.getDocKey() == null || document.getDocKey().trim().isEmpty()) {
            document.setDocKey("rc-" + System.currentTimeMillis());
        }
        return rcDocumentRepository.save(document);
    }

    @Transactional
    public RcDocument update(Long id, RcDocument details) {
        RcDocument document = getById(id);
        String oldPath = document.getPath();

        document.setDocKey(details.getDocKey());
        document.setTitle(details.getTitle());
        document.setFilename(details.getFilename());
        document.setCategory(details.getCategory());
        document.setDescription(details.getDescription());
        document.setFileType(details.getFileType());
        document.setFileSize(details.getFileSize());
        document.setPath(details.getPath());
        if (details.getStatus() != null) {
            document.setStatus(details.getStatus());
        }

        if (oldPath != null && !oldPath.equals(details.getPath())) {
            fileUploadService.deleteOldFileIfInternal(oldPath);
        }

        return rcDocumentRepository.save(document);
    }

    @Transactional
    public void delete(Long id) {
        RcDocument document = getById(id);
        if (document.getPath() != null) {
            fileUploadService.deleteOldFileIfInternal(document.getPath());
        }
        rcDocumentRepository.delete(document);
    }
}
