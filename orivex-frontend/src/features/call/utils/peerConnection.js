let peerConnection = null;

const configuration = {

  iceServers: [

    {

      urls: "stun:stun.l.google.com:19302",

    },

    {

      urls: "stun:stun1.l.google.com:19302",

    },

  ],

};

export function createPeerConnection() {

  if (peerConnection) {

    return peerConnection;

  }

  peerConnection = new RTCPeerConnection(
    configuration
  );

  return peerConnection;

}

export function getPeerConnection() {

  return peerConnection;

}

export function closePeerConnection() {

  peerConnection?.close();

  peerConnection = null;

}