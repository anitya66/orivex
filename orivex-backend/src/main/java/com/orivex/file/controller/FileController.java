package com.orivex.file.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.orivex.file.dto.FileUploadResponse;
import com.orivex.file.service.FileService;
import org.springframework.http.MediaType;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping(value = "/chat", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public FileUploadResponse uploadChatFile(

            @RequestPart("file") MultipartFile file) {

        return fileService.storeFile(file, "chat");

    }

}