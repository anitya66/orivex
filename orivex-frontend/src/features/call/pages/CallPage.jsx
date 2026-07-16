import { useSearchParams } from "react-router-dom";

import CallRoom from "../components/LiveKitRoom";
import { useCallToken } from "../hooks/useCallToken";

function CallPage() {
  const [params] = useSearchParams();

  const roomName = params.get("room");

  // Invalid room
  if (!roomName) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 px-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-red-400">
            Invalid Room
          </h1>

          <p className="mt-3 text-slate-400">
            No room was provided.
          </p>
        </div>
      </div>
    );
  }

  const {
    data,
    isLoading,
    isError,
  } = useCallToken(roomName);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 px-6 text-center">
        <div className="space-y-5">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

          <h2 className="text-2xl font-bold text-white">
            Joining Room...
          </h2>

          <p className="text-slate-400">
            Please wait while we connect you.
          </p>

        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 px-6 text-center">
        <div>

          <h2 className="text-2xl font-bold text-red-400">
            Failed to Join Room
          </h2>

          <p className="mt-3 text-slate-400">
            Unable to connect to the call.
            Please try again.
          </p>

        </div>
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