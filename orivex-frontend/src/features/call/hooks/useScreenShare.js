import { useLocalParticipant } from "@livekit/components-react";

export default function useScreenShare() {

  const {

    localParticipant,

    isScreenShareEnabled,

  } = useLocalParticipant();

  async function toggleScreenShare() {

    await localParticipant.setScreenShareEnabled(
      !isScreenShareEnabled
    );

  }

  return {

    enabled: isScreenShareEnabled,

    toggleScreenShare,

  };

}