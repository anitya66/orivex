package com.orivex.call.controller;

import org.springframework.web.bind.annotation.*;

import com.orivex.call.dto.LiveKitTokenRequest;
import com.orivex.call.dto.LiveKitTokenResponse;
import com.orivex.call.service.LiveKitService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/call")
@RequiredArgsConstructor
public class LiveKitController {

    private final LiveKitService liveKitService;

    @PostMapping("/token")
    public LiveKitTokenResponse token(
            @RequestBody LiveKitTokenRequest request) {

        return liveKitService.generateToken(
                request);

    }

}