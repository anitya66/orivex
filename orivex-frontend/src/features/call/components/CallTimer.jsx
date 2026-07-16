import { Clock3 } from "lucide-react";

import useCallTimer from "../hooks/useCallTimer";

export default function CallTimer() {

  const timer = useCallTimer();

  return (

    <div className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white">

      <Clock3 size={18} />

      {timer}

    </div>

  );

}