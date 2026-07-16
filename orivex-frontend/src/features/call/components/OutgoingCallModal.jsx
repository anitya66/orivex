import { PhoneOff } from "lucide-react";

import { useCall } from "../hooks/useCall";

import {
  cancelCall,
} from "../websocket/callSocket";

export default function OutgoingCallModal() {

  const {

    outgoingCall,

    setOutgoingCall,

  } = useCall();

  if (!outgoingCall) return null;

  function handleCancel() {

    cancelCall(outgoingCall);

    setOutgoingCall(null);

  }

  return (

    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950">

      <div className="text-center">

        <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white">

          {outgoingCall.receiverName?.charAt(0)}

        </div>

        <h1 className="text-5xl font-bold text-white">

          {outgoingCall.receiverName}

        </h1>

        <p className="mt-4 text-xl text-slate-400">

          Calling...

        </p>

        <button

          onClick={handleCancel}

          className="mt-10 rounded-full bg-red-600 p-6 text-white"

        >

          <PhoneOff size={40} />

        </button>

      </div>

    </div>

  );

}