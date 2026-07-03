package com.orivex.file.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.orivex.file.service.FileService;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class FileDownloadController {

    private final FileService fileService;

    @GetMapping("/{folder}/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(

            @PathVariable String folder,

            @PathVariable String fileName) {

        Resource resource = fileService.loadFile(
                folder,
                fileName);

        return ResponseEntity.ok()

                .contentType(
                        MediaType.APPLICATION_OCTET_STREAM)

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" +
                                resource.getFilename() +
                                "\"")

                .body(resource);

    }

}