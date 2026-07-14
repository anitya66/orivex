package com.orivex.user.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import com.orivex.common.response.ApiResponse;
import com.orivex.user.dto.CreateFreelancerProfileRequest;
import com.orivex.user.dto.FreelancerProfileResponse;
import com.orivex.user.dto.UpdateFreelancerProfileRequest;
import com.orivex.user.service.FreelancerProfileService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/freelancer")
@RequiredArgsConstructor
@Validated
public class FreelancerProfileController {

    private final FreelancerProfileService freelancerProfileService;

    @PostMapping("/profile")
    public ApiResponse<FreelancerProfileResponse> createProfile(
            @Valid @RequestBody CreateFreelancerProfileRequest request) {

        return freelancerProfileService.createProfile(request);

    }

    @GetMapping("/profile")
    public ApiResponse<FreelancerProfileResponse> getMyProfile() {

        return freelancerProfileService.getMyProfile();

    }

    @PutMapping("/profile")
    public ApiResponse<FreelancerProfileResponse> updateProfile(
            @Valid @RequestBody UpdateFreelancerProfileRequest request) {

        return freelancerProfileService.updateProfile(request);

    }

    @GetMapping("/profile/{id}")
    public ApiResponse<FreelancerProfileResponse> getProfileById(
            @PathVariable Long id) {

        return freelancerProfileService.getProfileById(id);

    }

    @PostMapping(
        value = "/profile-image",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ApiResponse<String> uploadProfileImage(
        @RequestPart("file") MultipartFile file) {

    return freelancerProfileService
            .uploadProfileImage(file);

}

@DeleteMapping("/profile-image")
public ApiResponse<String> removeProfileImage() {

    return freelancerProfileService.removeProfileImage();

}

@PostMapping(value = "/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ApiResponse<String> uploadResume(
        @RequestPart("file") MultipartFile file) {

    return freelancerProfileService
            .uploadResume(file);

}

@DeleteMapping("/resume")
public ApiResponse<String> removeResume() {

    return freelancerProfileService.removeResume();

}


}