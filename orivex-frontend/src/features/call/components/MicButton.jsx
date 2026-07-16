import {
  Mic,
  MicOff,
} from "lucide-react";

import useMic from "../hooks/useMic";

export default function MicButton() {

  const {

    enabled,

    toggleMic,

  } = useMic();

  return (

    <button
      onClick={toggleMic}
      className={`rounded-xl px-5 py-3 transition
      ${
        enabled
          ? "bg-slate-800 text-white"
          : "bg-red-600 text-white"
      }`}
    >

      {enabled
        ? <Mic />
        : <MicOff />}

    </button>

  );

}