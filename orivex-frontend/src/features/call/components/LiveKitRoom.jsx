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

        <LiveKitRoom

            token={token}

            serverUrl={serverUrl}

            connect

            audio

            video

            onDisconnected={onDisconnected}

            style={{

                height: "100vh",

                width: "100vw",

            }}

        >

            <CallScreen />

        </LiveKitRoom>

    );

}

export default LiveKitRoomComponent;