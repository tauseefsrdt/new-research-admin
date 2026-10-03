package com.example.crud.service;

import com.example.crud.dto.PageResponse;
import com.example.crud.entity.Book;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.BookRepository;
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
public class BookService {

    private final BookRepository bookRepository;

    public PageResponse<Book> getAll(String search, String status, String year, int page, int size, String sortBy, String sortDir) {
        Sort sort;
        if ("slNo".equalsIgnoreCase(sortBy) || "srNo".equalsIgnoreCase(sortBy) || "default".equalsIgnoreCase(sortBy) || sortBy == null || sortBy.isEmpty()) {
            sort = Sort.by(Sort.Order.asc("slNo").nullsFirst(), Sort.Order.desc("id"));
        } else {
            sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Book> result = bookRepository.findWithFilters(search, status, year, pageable);
        return PageResponse.of(result);
    }

    public List<Book> getAllList() {
        return bookRepository.findAll(Sort.by(Sort.Direction.ASC, "slNo"));
    }

    public Book getById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book record not found with id: " + id));
    }

    @Transactional
    public Book create(Book book) {
        if (book.getSlNo() == null) {
            book.setSlNo(0);
        }
        if (book.getTitle() == null) {
            book.setTitle(book.getPaperTitle() != null ? book.getPaperTitle() : book.getBookOrChapterTitle());
        }
        if (book.getAuthors() == null && book.getTeacherName() != null) {
            book.setAuthors(book.getTeacherName());
        }
        if (book.getYear() == null && book.getYearOfPublication() != null) {
            book.setYear(book.getYearOfPublication());
        }
        if (book.getPublisher() == null && book.getPublisherName() != null) {
            book.setPublisher(book.getPublisherName());
        }
        if (book.getIsbn() == null && book.getIsbnIssn() != null) {
            book.setIsbn(book.getIsbnIssn());
        }
        if (book.getAbstractText() == null && book.getBookOrChapterTitle() != null) {
            book.setAbstractText(book.getBookOrChapterTitle());
        }
        return bookRepository.save(book);
    }

    @Transactional
    public Book update(Long id, Book details) {
        Book book = getById(id);
        book.setSlNo(details.getSlNo());
        book.setTeacherName(details.getTeacherName());
        book.setBookOrChapterTitle(details.getBookOrChapterTitle());
        book.setPaperTitle(details.getPaperTitle());
        book.setConferenceProceedingTitle(details.getConferenceProceedingTitle());
        book.setConferenceName(details.getConferenceName());
        book.setScope(details.getScope());
        book.setYearOfPublication(details.getYearOfPublication());
        book.setIsbnIssn(details.getIsbnIssn());
        book.setAffiliatingInstitute(details.getAffiliatingInstitute());
        book.setPublisherName(details.getPublisherName());
        book.setTitle(details.getTitle() != null ? details.getTitle() : details.getBookOrChapterTitle());
        book.setAuthors(details.getAuthors() != null ? details.getAuthors() : details.getTeacherName());
        book.setYear(details.getYear() != null ? details.getYear() : details.getYearOfPublication());
        book.setPublisher(details.getPublisher() != null ? details.getPublisher() : details.getPublisherName());
        book.setAbstractText(details.getAbstractText());
        book.setIsbn(details.getIsbn() != null ? details.getIsbn() : details.getIsbnIssn());
        if (details.getStatus() != null) {
            book.setStatus(details.getStatus());
        }
        return bookRepository.save(book);
    }

    @Transactional
    public void delete(Long id) {
        Book book = getById(id);
        bookRepository.delete(book);
    }

    public List<Book> getFeatured() {
        return bookRepository.findAll(PageRequest.of(0, 3, Sort.by("id").ascending())).getContent();
    }
}
