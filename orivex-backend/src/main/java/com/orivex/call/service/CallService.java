package com.orivex.call.service;

import com.orivex.call.dto.CallTokenResponse;

public interface CallService {

    CallTokenResponse generateToken(
            String roomName);

}