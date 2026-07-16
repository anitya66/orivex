package com.orivex.call.service;

import com.orivex.call.dto.LiveKitTokenRequest;
import com.orivex.call.dto.LiveKitTokenResponse;

public interface LiveKitService {

    LiveKitTokenResponse generateToken(
            LiveKitTokenRequest request);

}