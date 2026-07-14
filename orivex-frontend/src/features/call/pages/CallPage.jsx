import { useSearchParams } from "react-router-dom";

import CallRoom from "../components/LiveKitRoom";

import { useCallToken } from "../hooks/useCallToken";

function CallPage() {

  const [params] = useSearchParams();

  const roomName =
    params.get("room");

  const {

    data,

    isLoading,

    isError,

  } = useCallToken(roomName);

  if (isLoading) {

    return (

      <div className="flex h-screen items-center justify-center text-white">

        Joining room...

      </div>

    );

  }

  if (isError) {

    return (

      <div className="flex h-screen items-center justify-center text-red-500">

        Failed to join room.

      </div>

    );

  }

  return (

    <CallRoom

      token={data.token}

      serverUrl={data.serverUrl}

      onDisconnected={() => {

        window.close();

      }}

    />

  );

}

export default CallPage;