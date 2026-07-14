package com.orivex.call.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.orivex.call.dto.CallTokenResponse;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.User;
import io.livekit.server.RoomName;
import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CallServiceImpl implements CallService {

    @Value("${livekit.api.key}")
    private String apiKey;

    @Value("${livekit.api.secret}")
    private String apiSecret;

    @Value("${livekit.url}")
    private String serverUrl;

    private final AuthenticationFacade authenticationFacade;

    @Override
    public CallTokenResponse generateToken(String roomName) {

        User currentUser = authenticationFacade.getCurrentUser();

        AccessToken token = new AccessToken(
                apiKey,
                apiSecret);

        token.setIdentity(
                currentUser.getId().toString());

        token.setName(
                currentUser.getName());

        token.addGrants(

                new RoomJoin(true),

                new RoomName(roomName)

        );

        return new CallTokenResponse(

                token.toJwt(),

                serverUrl

        );

    }
}