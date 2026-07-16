import {
  MonitorUp,
  MonitorOff,
} from "lucide-react";

import useScreenShare from "../hooks/useScreenShare";

export default function ScreenShareButton() {

  const {

    enabled,

    toggleScreenShare,

  } = useScreenShare();

  return (

    <button
      onClick={toggleScreenShare}
      className={`rounded-xl px-5 py-3 transition
      ${
        enabled
          ? "bg-blue-600 text-white"
          : "bg-slate-800 text-white"
      }`}
    >

      {

        enabled

          ? <MonitorOff />

          : <MonitorUp />

      }

    </button>

  );

}