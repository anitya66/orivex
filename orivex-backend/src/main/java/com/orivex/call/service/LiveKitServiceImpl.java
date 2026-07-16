package com.orivex.call.service;
import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import io.livekit.server.RoomName;
import org.springframework.stereotype.Service;
import com.orivex.call.config.LiveKitProperties;
import com.orivex.call.dto.LiveKitTokenRequest;
import com.orivex.call.dto.LiveKitTokenResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LiveKitServiceImpl implements LiveKitService {

    private final LiveKitProperties properties;

    @Override
    public LiveKitTokenResponse generateToken(
            LiveKitTokenRequest request) {

        try {

            System.out.println("========== LIVEKIT ==========");
            System.out.println("API KEY     : " + properties.getApiKey());
            System.out.println("API SECRET  : " + properties.getApiSecret());
            System.out.println("SERVER URL  : " + properties.getServerUrl());

            System.out.println("ROOM        : " + request.getRoomName());
            System.out.println("IDENTITY    : " + request.getParticipantIdentity());
            System.out.println("NAME        : " + request.getParticipantName());

            AccessToken token = new AccessToken(
                    properties.getApiKey(),
                    properties.getApiSecret());

            token.setIdentity(request.getParticipantIdentity());
            token.setName(request.getParticipantName());

            token.addGrants(
                    new RoomJoin(true),
                    new RoomName(request.getRoomName()));

            String jwt = token.toJwt();

            System.out.println("TOKEN CREATED SUCCESSFULLY");
            System.out.println("===========================");

            return LiveKitTokenResponse.builder()
                    .serverUrl(properties.getServerUrl())
                    .participantToken(jwt)
                    .build();

        } catch (Exception e) {

            System.out.println("========== LIVEKIT ERROR ==========");
            e.printStackTrace();
            System.out.println("===================================");

            throw e;
        }
    }
}