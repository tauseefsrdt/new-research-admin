package com.example.crud.config;

import com.example.crud.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class WebConfig implements WebMvcConfigurer {

    private final FileUploadService fileUploadService;

    @Value("${cors.allowed-origins:*}")
    private String allowedOrigins;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path rootUploadPath = fileUploadService.getRootUploadPath();
        String uploadLocation = rootUploadPath.toUri().toString();

        if (!uploadLocation.endsWith("/")) {
            uploadLocation += "/";
        }

        registry.addResourceHandler("/upload_image/**")
                .addResourceLocations(uploadLocation)
                .setCachePeriod(3600);

        log.info("Registered static resource handler for /upload_image/** -> {}", uploadLocation);

        Path rootPdfUploadPath = fileUploadService.getRootPdfUploadPath();
        String pdfUploadLocation = rootPdfUploadPath.toUri().toString();

        if (!pdfUploadLocation.endsWith("/")) {
            pdfUploadLocation += "/";
        }

        registry.addResourceHandler("/upload_pdf/**")
                .addResourceLocations(pdfUploadLocation)
                .setCachePeriod(3600);

        log.info("Registered static resource handler for /upload_pdf/** -> {}", pdfUploadLocation);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] origins = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toArray(String[]::new);

        registry.addMapping("/**")
                .allowedOriginPatterns(origins.length > 0 ? origins : new String[]{"*"})
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD")
                .allowedHeaders("*")
                .exposedHeaders("Authorization", "Content-Disposition", "Content-Type", "X-Total-Count")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
