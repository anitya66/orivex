import {
  Phone,
  PhoneOff,
} from "lucide-react";

function IncomingCallModal({

  caller,

  onAccept,

  onReject,

}) {

  if (!caller) return null;

  return (

    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md">

      <div className="w-[420px] rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

        <div className="flex flex-col items-center">

          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/20 text-4xl font-black text-white">

            {caller.senderName.charAt(0)}

          </div>

          <h2 className="text-3xl font-black text-white">

            Incoming Call

          </h2>

          <p className="mt-3 text-lg text-slate-400">

            {caller.senderName}

          </p>

          <p className="mt-1 text-slate-500">

            is calling you...

          </p>

          <div className="mt-10 flex gap-8">

            <button

              onClick={onReject}

              className="rounded-full bg-red-600 p-5 text-white transition hover:scale-110"

            >

              <PhoneOff size={28} />

            </button>

            <button

              onClick={onAccept}

              className="rounded-full bg-green-600 p-5 text-white transition hover:scale-110"

            >

              <Phone size={28} />

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default IncomingCallModal;