package com.orivex.user.service;

import org.springframework.web.multipart.MultipartFile;

import com.orivex.common.response.ApiResponse;
import com.orivex.user.dto.CreateFreelancerProfileRequest;
import com.orivex.user.dto.FreelancerProfileResponse;
import com.orivex.user.dto.UpdateFreelancerProfileRequest;

public interface FreelancerProfileService {

        ApiResponse<FreelancerProfileResponse> createProfile(
                        CreateFreelancerProfileRequest request);

        ApiResponse<FreelancerProfileResponse> getMyProfile();

        ApiResponse<FreelancerProfileResponse> updateProfile(
                        UpdateFreelancerProfileRequest request);

        ApiResponse<FreelancerProfileResponse> getProfileById(
                        Long id);

        ApiResponse<String> uploadProfileImage(
                        MultipartFile file);

        ApiResponse<String> uploadResume(
                        MultipartFile file);

}