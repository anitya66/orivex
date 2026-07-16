import {
  Video,
  VideoOff,
} from "lucide-react";

import useCamera from "../hooks/useCamera";

export default function CameraButton() {

  const {

    enabled,

    toggleCamera,

  } = useCamera();

  return (

    <button
      onClick={toggleCamera}
      className={`rounded-xl px-5 py-3 transition
      ${
        enabled
          ? "bg-slate-800 text-white"
          : "bg-red-600 text-white"
      }`}
    >

      {enabled
        ? <Video />
        : <VideoOff />}

    </button>

  );

}