package com.orivex.call.controller;

import java.security.Principal;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.orivex.call.dto.CallSignalMessage;
import com.orivex.user.entity.User;
import com.orivex.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CallSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepository;

    @MessageMapping("/call")
    public void signaling(CallSignalMessage message,
            Principal principal) {

        System.out.println("=================================");
        System.out.println("CALL RECEIVED");
        System.out.println("Principal = "
                + (principal == null ? "NULL" : principal.getName()));
        System.out.println("ReceiverId = " + message.getReceiverId());
        System.out.println("=================================");

        User receiver = userRepository
                .findById(message.getReceiverId())
                .orElseThrow();

        System.out.println("Receiver Email = " + receiver.getEmail());

        messagingTemplate.convertAndSendToUser(
                receiver.getEmail(),
                "/queue/call",
                message);

        System.out.println("Signal Sent");
    }
}