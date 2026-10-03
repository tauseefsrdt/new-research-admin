package com.example.crud.config;

import com.example.crud.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class WebConfig implements WebMvcConfigurer {

    private final FileUploadService fileUploadService;

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
    }
}
