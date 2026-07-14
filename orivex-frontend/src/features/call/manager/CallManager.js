import {
  createPeerConnection,
  closePeerConnection,
} from "../utils/peerConnection";

import {
  sendCallSignal,
} from "../websocket/callSocket";

class CallManager {

  constructor() {

    this.peer = null;

    this.localStream = null;

    this.remoteStream = null;

    this.callState = "IDLE";

    this.currentCall = null;

  }

  async initialize() {

    if (!this.peer) {

      this.peer =
        createPeerConnection();

    }

    return this.peer;

  }

  async requestAudio() {

    this.localStream =
      await navigator.mediaDevices.getUserMedia({

        audio: true,

        video: false,

      });

    return this.localStream;

  }

  async requestVideo() {

    this.localStream =
      await navigator.mediaDevices.getUserMedia({

        audio: true,

        video: true,

      });

    return this.localStream;

  }

  async startAudioCall(
    conversation,
    user
  ) {

    this.callState = "OUTGOING";

    this.currentCall = conversation;

    await this.initialize();

    await this.requestAudio();

    sendCallSignal({

      type: "CALL_REQUEST",

      callType: "AUDIO",

      conversationId: conversation.id,

      senderId: user.id,

      senderName: user.name,

      receiverId:
        conversation.otherUserId,

    });

  }

  async startVideoCall(
    conversation,
    user
  ) {

    this.callState = "OUTGOING";

    this.currentCall = conversation;

    await this.initialize();

    await this.requestVideo();

    sendCallSignal({

      type: "CALL_REQUEST",

      callType: "VIDEO",

      conversationId: conversation.id,

      senderId: user.id,

      senderName: user.name,

      receiverId:
        conversation.otherUserId,

    });

  }

  endCall() {

    this.localStream
      ?.getTracks()
      .forEach((track) => {

        track.stop();

      });

    closePeerConnection();

    this.peer = null;

    this.localStream = null;

    this.remoteStream = null;

    this.currentCall = null;

    this.callState = "IDLE";

  }

}

export default new CallManager();