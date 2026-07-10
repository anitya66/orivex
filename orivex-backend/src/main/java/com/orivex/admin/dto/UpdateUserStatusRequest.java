package com.orivex.admin.dto;

import com.orivex.user.enums.AccountStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateUserStatusRequest {

    @NotNull(message = "Status is required.")
    private AccountStatus status;

}