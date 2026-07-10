package com.orivex.user.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import com.orivex.common.response.ApiResponse;
import com.orivex.user.dto.ClientProfileResponse;
import com.orivex.user.dto.CreateClientProfileRequest;
import com.orivex.user.service.ClientProfileService;
import com.orivex.user.dto.UpdateClientProfileRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/client")
@RequiredArgsConstructor
@Validated
public class ClientProfileController {

    private final ClientProfileService clientProfileService;

    @PostMapping("/profile")
    public ApiResponse<ClientProfileResponse> createProfile(
            @Valid @RequestBody CreateClientProfileRequest request) {

        return clientProfileService.createProfile(request);

    }

    @GetMapping("/profile")
    public ApiResponse<ClientProfileResponse> getMyProfile() {

        return clientProfileService.getMyProfile();

    }

    @GetMapping("/profile/{id}")
    public ApiResponse<ClientProfileResponse> getProfileById(
            @PathVariable Long id) {

        return clientProfileService.getProfileById(id);

    }

    @PostMapping(
        value = "/company-logo",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<String> uploadCompanyLogo(
            @RequestPart("file") MultipartFile file) {

        return clientProfileService.uploadCompanyLogo(file);

    }

    @PutMapping("/profile")
    public ApiResponse<ClientProfileResponse> updateProfile(
            @Valid @RequestBody UpdateClientProfileRequest request) {

        return clientProfileService.updateProfile(request);

    }



}