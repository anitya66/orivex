package com.orivex.file.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.orivex.common.response.ApiResponse;
import com.orivex.file.dto.FileUploadResponse;
import com.orivex.file.service.FileService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
@Tag(name = "File Upload", description = "File Upload APIs")
public class FileController {

    private final FileService fileService;

    @PostMapping(value = "/profile-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload Profile Image")
    public ApiResponse<FileUploadResponse> uploadProfileImage(
            @RequestPart("file") MultipartFile file) {

        return ApiResponse.success(
                fileService.uploadProfileImage(file),
                "Profile image uploaded successfully.");
    }

    @PostMapping(value = "/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload Resume")
    public ApiResponse<FileUploadResponse> uploadResume(
            @RequestPart("file") MultipartFile file) {

        return ApiResponse.success(
                fileService.uploadResume(file),
                "Resume uploaded successfully.");
    }

    @PostMapping(value = "/company-logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload Company Logo")
    public ApiResponse<FileUploadResponse> uploadCompanyLogo(
            @RequestPart("file") MultipartFile file) {

        return ApiResponse.success(
                fileService.uploadCompanyLogo(file),
                "Company logo uploaded successfully.");
    }

}