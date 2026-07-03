package com.orivex.file.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.net.MalformedURLException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.orivex.common.exception.BadRequestException;
import com.orivex.file.config.FileStorageProperties;
import com.orivex.file.dto.FileUploadResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final FileStorageProperties properties;

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    private static final Set<String> ALLOWED_IMAGE_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp");

    private static final Set<String> ALLOWED_DOCUMENT_TYPES = Set.of(
            "application/pdf");

    private static final Set<String> ALLOWED_IMAGE_EXTENSIONS = Set.of(
            ".jpg",
            ".jpeg",
            ".png",
            ".webp");

    private static final Set<String> ALLOWED_DOCUMENT_EXTENSIONS = Set.of(
            ".pdf");        

    @Override
    public FileUploadResponse storeFile(
            MultipartFile file,
            String folder) {

        validateFile(file, folder);

        try {

            Path uploadPath = Paths.get(
                    properties.getUploadDir(),
                    folder);

            Files.createDirectories(uploadPath);

            String originalFileName =
                    file.getOriginalFilename();

            String extension = "";

            if (originalFileName != null &&
                    originalFileName.contains(".")) {

                extension = originalFileName.substring(
                        originalFileName.lastIndexOf("."));

            }

            String fileName =
                    UUID.randomUUID() + extension;

            Path targetLocation =
                    uploadPath.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    targetLocation,
                    StandardCopyOption.REPLACE_EXISTING);

            return FileUploadResponse.builder()
                    .fileName(fileName)
                    .fileDownloadUri(
                            "/api/v1/files/" +
                                    folder +
                                    "/" +
                                    fileName)
                    .fileType(file.getContentType())
                    .size(file.getSize())
                    .build();

        } catch (IOException e) {

            throw new BadRequestException(
                    "Unable to store file.");

        }

    }
    
    private void validateFile(
            MultipartFile file,
            String folder) {

        if (file == null || file.isEmpty()) {

            throw new BadRequestException(
                    "File cannot be empty.");

        }

        if (file.getSize() > MAX_FILE_SIZE) {

            throw new BadRequestException(
                    "Maximum file size is 5 MB.");

        }

        String contentType = file.getContentType();

        String fileName = file.getOriginalFilename();

        if (fileName == null || !fileName.contains(".")) {

            throw new BadRequestException(
                    "Invalid file.");

        }

        String extension = fileName.substring(fileName.lastIndexOf("."))
                .toLowerCase();

        if ("resumes".equals(folder)) {

            if (!ALLOWED_DOCUMENT_TYPES.contains(contentType)
                    || !ALLOWED_DOCUMENT_EXTENSIONS.contains(extension)) {

                throw new BadRequestException(
                        "Only PDF files are allowed.");

            }

        } else {

            if (!ALLOWED_IMAGE_TYPES.contains(contentType)
                    || !ALLOWED_IMAGE_EXTENSIONS.contains(extension)) {

                throw new BadRequestException(
                        "Only JPG, JPEG, PNG and WEBP images are allowed.");

            }

        }

    }

    @Override
public Resource loadFile(
        String folder,
        String fileName) {

    try {

        Path filePath = Paths.get(
                properties.getUploadDir(),
                folder)
                .resolve(fileName)
                .normalize();

        Resource resource = new UrlResource(
                filePath.toUri());

        if (resource.exists()) {
            return resource;
        }

        throw new BadRequestException(
                "File not found.");

    } catch (MalformedURLException e) {

        throw new BadRequestException(
                "File not found.");

    }

}

@Override
public void deleteFile(
        String filePath) {

    if (filePath == null || filePath.isBlank()) {
        return;
    }

    try {

        String relativePath = filePath.replace("/api/v1/files/", "");

        Path path = Paths.get(
                properties.getUploadDir(),
                relativePath);

        Files.deleteIfExists(path);

    } catch (IOException e) {

        throw new BadRequestException(
                "Unable to delete file.");

    }

}

}        