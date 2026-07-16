import { useLocalParticipant } from "@livekit/components-react";

export default function useCamera() {

  const {

    localParticipant,

    isCameraEnabled,

  } = useLocalParticipant();

  async function toggleCamera() {

    await localParticipant.setCameraEnabled(
      !isCameraEnabled
    );

  }

  return {

    enabled: isCameraEnabled,

    toggleCamera,

  };

}