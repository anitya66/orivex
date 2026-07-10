package com.orivex.admin.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.orivex.user.enums.AccountStatus;
import com.orivex.user.enums.UserRole;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDetailsResponse {

    private Long id;

    private String name;

    private String email;

    private UserRole role;

    private AccountStatus accountStatus;

    private LocalDateTime createdAt;

    // Freelancer fields

    private String bio;

    private String skills;

    private Integer experienceYears;

    private BigDecimal hourlyRate;

    private String portfolioUrl;

    private String githubUrl;

    private String linkedinUrl;

    private String resumeUrl;

    private String profileImage;

}