package com.orivex.user.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateClientProfileRequest {

    @Size(min = 2, max = 150)
    private String companyName;

    @Size(min = 10, max = 1000)
    private String companyDescription;

    @Size(max = 255)
    private String website;

}