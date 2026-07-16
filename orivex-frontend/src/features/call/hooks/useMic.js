import { useLocalParticipant } from "@livekit/components-react";

export default function useMic() {

  const {

    localParticipant,

    isMicrophoneEnabled,

  } = useLocalParticipant();

  async function toggleMic() {

    await localParticipant.setMicrophoneEnabled(
      !isMicrophoneEnabled
    );

  }

  return {

    enabled: isMicrophoneEnabled,

    toggleMic,

  };

}