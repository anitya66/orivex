import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";

import {
  useLocalParticipant,
  useRoomContext,
} from "@livekit/components-react";

import { useNavigate } from "react-router-dom";

function CallControls() {
  const navigate = useNavigate();

  const room = useRoomContext();

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

  async function leaveCall() {
    await room.disconnect();

    navigate("/dashboard/chat");
  }

  return (
    <div className="mx-auto mb-4 flex w-fit items-center gap-3 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:gap-5 sm:px-6 sm:py-4">

      {/* Mic */}

      <button
        aria-label="Toggle microphone"
        onClick={toggleMic}
        className={`rounded-full p-3 transition-all duration-200 hover:scale-105 ${
          isMicrophoneEnabled
            ? "bg-slate-800 text-white hover:bg-slate-700"
            : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
        }`}
      >
        {isMicrophoneEnabled ? (
          <Mic size={22} />
        ) : (
          <MicOff size={22} />
        )}
      </button>

      {/* Camera */}

      <button
        aria-label="Toggle camera"
        onClick={toggleCamera}
        className={`rounded-full p-3 transition-all duration-200 hover:scale-105 ${
          isCameraEnabled
            ? "bg-slate-800 text-white hover:bg-slate-700"
            : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
        }`}
      >
        {isCameraEnabled ? (
          <Video size={22} />
        ) : (
          <VideoOff size={22} />
        )}
      </button>

      {/* Leave */}

      <button
        aria-label="Leave call"
        onClick={leaveCall}
        className="rounded-full bg-red-600 p-3 text-white transition-all duration-200 hover:scale-105 hover:bg-red-700"
      >
        <PhoneOff size={22} />
      </button>

    </div>
  );
}

export default CallControls;