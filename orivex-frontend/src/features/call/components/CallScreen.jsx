import ParticipantGrid from "./ParticipantTile";
import CallControls from "./CallControls";

function CallScreen() {

  return (

    <div className="relative h-screen w-screen overflow-hidden bg-slate-950">

      <ParticipantGrid />

      <CallControls />

    </div>

  );

}

export default CallScreen;