package com.orivex.auth.service;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.orivex.security.AuthenticationFacade;

import com.orivex.auth.dto.ChangePasswordRequest;

import com.orivex.auth.dto.CurrentUserResponse;
import com.orivex.user.entity.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.orivex.auth.dto.LoginRequest;
import com.orivex.auth.dto.LoginResponse;
import com.orivex.auth.dto.RegisterRequest;
import com.orivex.auth.mapper.AuthMapper;
import com.orivex.common.exception.BadRequestException;
import com.orivex.common.response.ApiResponse;
import com.orivex.security.JwtService;

import com.orivex.user.enums.AccountStatus;
import com.orivex.security.AuthenticationFacade;
import com.orivex.security.CustomUserDetails;

import com.orivex.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    private final AuthMapper authMapper;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final AuthenticationFacade authenticationFacade;

    @Override
    public ApiResponse<String> register(RegisterRequest request) {

        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {

            throw new BadRequestException(
                    "Email is already registered.");

        }

        User user = authMapper.toUser(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setAccountStatus(AccountStatus.PENDING_VERIFICATION);

        userRepository.save(user);

        return ApiResponse.success(
                "User Registered Successfully.");

    }

    @Override
    public ApiResponse<LoginResponse> login(
            LoginRequest request) {

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        request.getEmail(),

                        request.getPassword()

                )

        );

        User user = userRepository.findByEmail(
                request.getEmail()).orElseThrow(
                        () -> new BadRequestException(
                                "Invalid email or password."));

        if (user.getAccountStatus() == AccountStatus.DELETED) {

                throw new BadRequestException(
                                "This account has been deleted.");

        }

        if (user.getAccountStatus() == AccountStatus.BANNED) {

                throw new BadRequestException(
                                "Your account has been banned.");

        }

        if (user.getAccountStatus() == AccountStatus.SUSPENDED) {

                throw new BadRequestException(
                                "Your account has been suspended.");

        }

        String token = jwtService.generateToken(
                user.getEmail());

        LoginResponse response = LoginResponse.builder()

                .accessToken(token)

                .tokenType("Bearer")

                .build();

        return ApiResponse.success(
                response,
                "Login Successful.");

    }

    @Override
    public ApiResponse<CurrentUserResponse> getCurrentUser() {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            User user = userDetails.getUser();

            CurrentUserResponse response = CurrentUserResponse.builder()
                            .id(user.getId())
                            .name(user.getName())
                            .email(user.getEmail())
                            .role(user.getRole())
                            .build();

            return ApiResponse.success(
                            response,
                            "User fetched successfully.");
    }
    
    @Override
public ApiResponse<String> changePassword(
                ChangePasswordRequest request) {

        User currentUser = authenticationFacade.getCurrentUser();

        if (!passwordEncoder.matches(
                        request.getCurrentPassword(),
                        currentUser.getPassword())) {

                throw new BadRequestException(
                                "Current password is incorrect.");
        }

        if (request.getCurrentPassword()
                        .equals(request.getNewPassword())) {

                throw new BadRequestException(
                                "New password must be different from the current password.");
        }

        currentUser.setPassword(
                        passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(currentUser);

        return ApiResponse.success(
                        "Password changed successfully.");
}

}