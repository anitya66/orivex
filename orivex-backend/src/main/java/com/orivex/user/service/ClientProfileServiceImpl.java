package com.orivex.user.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.orivex.user.dto.UpdateClientProfileRequest;
import com.orivex.common.exception.BadRequestException;
import com.orivex.common.response.ApiResponse;
import com.orivex.file.dto.FileUploadResponse;
import com.orivex.file.service.FileService;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.dto.ClientProfileResponse;
import com.orivex.user.dto.CreateClientProfileRequest;
import com.orivex.user.entity.ClientProfile;
import com.orivex.user.entity.User;
import com.orivex.user.mapper.ClientProfileMapper;
import com.orivex.user.repository.ClientProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientProfileServiceImpl implements ClientProfileService {

        private final ClientProfileRepository clientProfileRepository;

        private final ClientProfileMapper clientProfileMapper;

        private final AuthenticationFacade authenticationFacade;

        private final FileService fileService;

        @Override
        public ApiResponse<ClientProfileResponse> createProfile(
                        CreateClientProfileRequest request) {

                User currentUser = authenticationFacade.getCurrentUser();

                if (clientProfileRepository.findByUser(currentUser).isPresent()) {

                        throw new BadRequestException(
                                        "Client profile already exists.");

                }

                ClientProfile profile = clientProfileMapper.toEntity(request);

                profile.setUser(currentUser);

                ClientProfile savedProfile = clientProfileRepository.save(profile);

                ClientProfileResponse response = clientProfileMapper.toResponse(savedProfile);

                return ApiResponse.success(
                                response,
                                "Client profile created successfully.");
        }

        @Override
        public ApiResponse<ClientProfileResponse> getMyProfile() {

                User currentUser = authenticationFacade.getCurrentUser();

                ClientProfile profile = clientProfileRepository
                                .findByUser(currentUser)
                                .orElseThrow(() -> new BadRequestException(
                                                "Client profile not found."));

                ClientProfileResponse response = clientProfileMapper.toResponse(profile);

                return ApiResponse.success(
                                response,
                                "Client profile fetched successfully.");
        }

        @Override
        public ApiResponse<ClientProfileResponse> getProfileById(
                        Long id) {

                ClientProfile profile = clientProfileRepository
                                .findById(id)
                                .orElseThrow(() -> new BadRequestException(
                                                "Client profile not found."));

                ClientProfileResponse response = clientProfileMapper.toResponse(profile);

                return ApiResponse.success(
                                response,
                                "Client profile fetched successfully.");
        }

        @Override
        public ApiResponse<String> uploadCompanyLogo(
                        MultipartFile file) {

                User currentUser = authenticationFacade.getCurrentUser();

                ClientProfile profile = clientProfileRepository
                                .findByUser(currentUser)
                                .orElseThrow(() -> new BadRequestException(
                                                "Client profile not found."));

                // Delete old logo if it exists
                if (profile.getCompanyLogo() != null &&
                                !profile.getCompanyLogo().isBlank()) {

                        fileService.deleteFile(
                                        profile.getCompanyLogo());

                }

                FileUploadResponse response = fileService.storeFile(
                                file,
                                "company-logos");

                profile.setCompanyLogo(
                                response.getFileDownloadUri());

                clientProfileRepository.save(profile);

                return ApiResponse.success(
                                response.getFileDownloadUri(),
                                "Company logo uploaded successfully.");
        }

        @Override
        public ApiResponse<ClientProfileResponse> updateProfile(
                        UpdateClientProfileRequest request) {

                User currentUser = authenticationFacade.getCurrentUser();

                ClientProfile profile = clientProfileRepository
                                .findByUser(currentUser)
                                .orElseThrow(() -> new BadRequestException(
                                                "Client profile not found."));

                clientProfileMapper.updateEntity(
                                request,
                                profile);

                ClientProfile updatedProfile = clientProfileRepository.save(profile);

                ClientProfileResponse response = clientProfileMapper.toResponse(updatedProfile);

                return ApiResponse.success(
                                response,
                                "Client profile updated successfully.");
        }

}