import "@livekit/components-styles";

import {
  LiveKitRoom,
} from "@livekit/components-react";

import CallScreen from "./CallScreen";

function LiveKitRoomComponent({
  token,
  serverUrl,
  onDisconnected,
}) {
  if (!token) return null;

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950">

      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect
        audio
        video
        onDisconnected={onDisconnected}
        className="h-full w-full"
      >
        <CallScreen />
      </LiveKitRoom>

    </div>
  );
}

export default LiveKitRoomComponent;