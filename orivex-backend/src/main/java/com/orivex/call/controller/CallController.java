package com.orivex.call.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orivex.call.dto.CallTokenResponse;
import com.orivex.call.service.CallService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/call")
@RequiredArgsConstructor
public class CallController {

    private final CallService callService;

    @GetMapping("/token")
    public CallTokenResponse getToken(

            @RequestParam String roomName

    ) {

        return callService.generateToken(
                roomName);

    }

}