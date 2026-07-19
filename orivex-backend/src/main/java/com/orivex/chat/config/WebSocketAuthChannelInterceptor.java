package com.orivex.chat.config;

import lombok.RequiredArgsConstructor;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.orivex.security.CustomUserDetailsService;
import com.orivex.security.JwtService;

@Component
@RequiredArgsConstructor
public class WebSocketAuthChannelInterceptor implements ChannelInterceptor {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    public Message<?> preSend(
            Message<?> message,
            MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        System.out.println("==================================");
        System.out.println("COMMAND : " + accessor.getCommand());
        

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {

            System.out.println("CONNECT RECEIVED");

            System.out.println("HEADERS : " + accessor.toNativeHeaderMap());

            String authHeader = accessor.getFirstNativeHeader("Authorization");

            if (authHeader == null && accessor.getSessionAttributes() != null) {
                Object sessionAuthHeader = accessor.getSessionAttributes().get("Authorization");
                if (sessionAuthHeader instanceof String sessionToken) {
                    authHeader = sessionToken;
                }
            }

            System.out.println("AUTH : " + authHeader);

            if (authHeader != null &&
                    authHeader.startsWith("Bearer ")) {

                try {

                    String jwt = authHeader.substring(7);

                    String email = jwtService.extractUsername(jwt);

                    System.out.println("EMAIL : " + email);

                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                    if (jwtService.isTokenValid(jwt, userDetails)) {

                        String username = userDetails.getUsername();

                        Authentication authentication = new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                userDetails.getAuthorities());

                        accessor.setUser(authentication);
                        accessor.setHeader(SimpMessageHeaderAccessor.USER_HEADER, authentication);
                        
                        System.out.println("==================================");
                        System.out.println("PRINCIPAL OBJECT = " + accessor.getUser());
                        System.out.println("PRINCIPAL NAME   = " + accessor.getUser().getName());
                        System.out.println("AUTH NAME        = " + authentication.getName());
                        System.out.println("==================================");

                        System.out.println("USER SET : "
                                + authentication.getName());

                    } else {

                        System.out.println("JWT INVALID");

                    }

                } catch (Exception e) {

                    System.out.println("========== JWT ERROR ==========");
                    e.printStackTrace();
                    System.out.println("===============================");

                }

            } else {

                System.out.println("NO AUTH HEADER");

            }

        }

        return message;
    }
}