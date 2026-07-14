import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";

import {
  useLocalParticipant,
} from "@livekit/components-react";

function CallControls() {

  const {

    localParticipant,

    isMicrophoneEnabled,

    isCameraEnabled,

  } = useLocalParticipant();

  async function toggleMic() {

    await localParticipant.setMicrophoneEnabled(
      !isMicrophoneEnabled
    );

  }

  async function toggleCamera() {

    await localParticipant.setCameraEnabled(
      !isCameraEnabled
    );

  }

  function leaveCall() {

    window.close();

  }

  return (

    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-5 rounded-full border border-slate-700 bg-slate-900/90 px-8 py-4 backdrop-blur-xl">

      <button
        onClick={toggleMic}
        className="rounded-full bg-slate-800 p-4 transition hover:bg-slate-700"
      >

        {isMicrophoneEnabled ? (
          <Mic />
        ) : (
          <MicOff />
        )}

      </button>

      <button
        onClick={toggleCamera}
        className="rounded-full bg-slate-800 p-4 transition hover:bg-slate-700"
      >

        {isCameraEnabled ? (
          <Video />
        ) : (
          <VideoOff />
        )}

      </button>

      <button
        onClick={leaveCall}
        className="rounded-full bg-red-600 p-4 transition hover:bg-red-700"
      >

        <PhoneOff />

      </button>

    </div>

  );

}

export default CallControls;