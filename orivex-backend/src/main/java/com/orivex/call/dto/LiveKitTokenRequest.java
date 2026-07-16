package com.orivex.call.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LiveKitTokenRequest {

    private String roomName;

    private String participantIdentity;

    private String participantName;

}