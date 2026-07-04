package com.orivex.auth.dto;

import com.orivex.user.enums.UserRole;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CurrentUserResponse {

    private Long id;

    private String name;

    private String email;

    private UserRole role;
}