package com.example.crud.config;

import com.example.crud.entity.User;
import com.example.crud.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PatentRepository patentRepository;
    private final ResearchPaperRepository researchPaperRepository;
    private final BookRepository bookRepository;
    private final InstituteRepository instituteRepository;
    private final VacantSeatRepository vacantSeatRepository;
    private final ThesisAwardedRepository thesisAwardedRepository;
    private final PhdSupervisorYearwiseRepository phdSupervisorYearwiseRepository;
    private final RcDocumentRepository rcDocumentRepository;
    private final LeadershipRepository leadershipRepository;
    private final PatronRepository patronRepository;
    private final GalleryImageRepository galleryImageRepository;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        migrateColumns();
        ensureAdminUser();
        logDatabaseCounts();
    }

    private void migrateColumns() {
        try {
            jdbcTemplate.execute("ALTER TABLE patents MODIFY COLUMN year TEXT");
            jdbcTemplate.execute("ALTER TABLE patents MODIFY COLUMN year_of_award TEXT");
            jdbcTemplate.execute("ALTER TABLE research_papers MODIFY COLUMN year TEXT");
            jdbcTemplate.execute("ALTER TABLE research_papers MODIFY COLUMN year_of_publication TEXT");
            jdbcTemplate.execute("ALTER TABLE books MODIFY COLUMN year TEXT");
            jdbcTemplate.execute("ALTER TABLE books MODIFY COLUMN year_of_publication TEXT");
        } catch (Exception e) {
            log.debug("Column migration note: {}", e.getMessage());
        }
    }

    private void ensureAdminUser() {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@srmu.ac.in")
                    .fullName("SRMU Research Administrator")
                    .password(passwordEncoder.encode("admin123"))
                    .role("ROLE_ADMIN")
                    .status("ACTIVE")
                    .build();
            userRepository.save(admin);
            log.info("Default admin user created: admin / admin123");
        }
    }

    private void logDatabaseCounts() {
        log.info("Connected MySQL Database Status -> Patents: {}, Research Papers: {}, Books: {}, Institutes: {}, Vacant Seats: {}, Theses: {}, Supervisors: {}, Documents: {}, Patrons: {}, Leadership: {}, Gallery: {}, Users: {}",
                patentRepository.count(),
                researchPaperRepository.count(),
                bookRepository.count(),
                instituteRepository.count(),
                vacantSeatRepository.count(),
                thesisAwardedRepository.count(),
                phdSupervisorYearwiseRepository.count(),
                rcDocumentRepository.count(),
                patronRepository.count(),
                leadershipRepository.count(),
                galleryImageRepository.count(),
                userRepository.count());
    }
}
