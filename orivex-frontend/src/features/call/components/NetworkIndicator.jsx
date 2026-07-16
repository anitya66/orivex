import { Wifi } from "lucide-react";

import useNetworkQuality from "../hooks/useNetworkQuality";

export default function NetworkIndicator() {

  const {

    text,

    color,

  } = useNetworkQuality();

  return (

    <div
      className={`flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold ${color}`}
    >

      <Wifi size={18} />

      {text}

    </div>

  );

}