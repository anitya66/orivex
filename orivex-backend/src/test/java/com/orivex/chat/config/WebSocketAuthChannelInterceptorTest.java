package com.orivex.chat.config;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.security.core.userdetails.UserDetails;

import com.orivex.security.CustomUserDetailsService;
import com.orivex.security.JwtService;

class WebSocketAuthChannelInterceptorTest {

    @Test
    void preSendShouldSetPrincipalFromHandshakeAuthorizationWhenConnectHeaderMissing() {
        JwtService jwtService = mock(JwtService.class);
        CustomUserDetailsService userDetailsService = mock(CustomUserDetailsService.class);
        WebSocketAuthChannelInterceptor interceptor = new WebSocketAuthChannelInterceptor(jwtService, userDetailsService);

        String email = "receiver@example.com";
        String token = "test-token";

        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn(email);
        when(userDetails.getAuthorities()).thenReturn(List.of());
        when(jwtService.extractUsername(token)).thenReturn(email);
        when(userDetailsService.loadUserByUsername(email)).thenReturn(userDetails);
        when(jwtService.isTokenValid(token, userDetails)).thenReturn(true);

        StompHeaderAccessor accessor = StompHeaderAccessor.create(StompCommand.CONNECT);
        HashMap<String, Object> sessionAttributes = new HashMap<>();
        sessionAttributes.put("Authorization", "Bearer " + token);
        accessor.setSessionAttributes(sessionAttributes);
        accessor.setHeader("simpSessionAttributes", sessionAttributes);

        Message<byte[]> message = MessageBuilder.createMessage(new byte[0], accessor.getMessageHeaders());

        Message<?> result = interceptor.preSend(message, mock(MessageChannel.class));

        StompHeaderAccessor resultAccessor = StompHeaderAccessor.wrap(result);

        assertNotNull(resultAccessor.getUser());
        assertEquals(email, resultAccessor.getUser().getName());
    }
}
