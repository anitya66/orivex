package com.orivex.call.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CallSignalMessage {

    private CallSignalType type;

    private CallType callType;

    private Long conversationId;

    private Long senderId;

    private String senderName;

    private Long receiverId;

    /*
     * Used for OFFER / ANSWER SDP
     */
    private Object sdp;

    /*
     * Used for ICE Candidate
     */
    private Object candidate;

}