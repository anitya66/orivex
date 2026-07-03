package com.orivex.file.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.orivex.file.dto.FileUploadResponse;

public interface FileService {

    FileUploadResponse storeFile(
            MultipartFile file,
            String folder);

    Resource loadFile(
            String folder,
            String fileName);

    void deleteFile(
            String filePath);
}