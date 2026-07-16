import ParticipantGrid from "./ParticipantTile";
import CallControls from "./CallControls";

function CallScreen() {
  return (
    <main className="relative h-full w-full overflow-hidden bg-slate-950">

      {/* Participants */}

      <div className="absolute inset-0">
        <ParticipantGrid />
      </div>

      {/* Bottom Controls */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)]">
        <div className="pointer-events-auto">
          <CallControls />
        </div>
      </div>

    </main>
  );
}

export default CallScreen;