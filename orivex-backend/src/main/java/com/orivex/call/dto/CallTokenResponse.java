package com.orivex.call.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CallTokenResponse {

    private String token;

    private String serverUrl;

}