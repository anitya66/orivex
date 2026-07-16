import { useEffect, useState } from "react";

import { Room } from "livekit-client";

import { fetchLiveKitToken } from "../services/liveKitService";

/* ==========================================
   LiveKit Hook
========================================== */

export default function useLiveKit({

  roomName,

  participantIdentity,

  participantName,

}) {

  const [room] = useState(() => new Room());

  const [token, setToken] = useState("");

  const [serverUrl, setServerUrl] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function init() {

      try {

        const response = await fetchLiveKitToken({

          roomName,

          participantIdentity,

          participantName,

        });

        setToken(response.participantToken);

        setServerUrl(response.serverUrl);

      }

      finally {

        setLoading(false);

      }

    }

    if (

      roomName &&

      participantIdentity &&

      participantName

    ) {

      init();

    }

  }, [

    roomName,

    participantIdentity,

    participantName,

  ]);

  return {

    room,

    token,

    serverUrl,

    loading,

  };

}