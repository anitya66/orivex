package com.orivex.user.service;

import org.springframework.web.multipart.MultipartFile;

import com.orivex.common.response.ApiResponse;
import com.orivex.user.dto.ClientProfileResponse;
import com.orivex.user.dto.CreateClientProfileRequest;

public interface ClientProfileService {

    ApiResponse<ClientProfileResponse> createProfile(
            CreateClientProfileRequest request);

    ApiResponse<ClientProfileResponse> getMyProfile();

    ApiResponse<ClientProfileResponse> getProfileById(
                    Long id);
            
    ApiResponse<String> uploadCompanyLogo(
        MultipartFile file);                

}