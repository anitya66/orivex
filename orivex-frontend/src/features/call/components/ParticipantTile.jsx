import {
  ParticipantTile as LKParticipantTile,
  useTracks,
} from "@livekit/components-react";

import { Track } from "livekit-client";

function ParticipantGrid() {
  const tracks = useTracks(
    [
      {
        source: Track.Source.Camera,
        withPlaceholder: true,
      },
    ]
  );

  if (!tracks.length) {
    return (
      <div className="flex h-full items-center justify-center text-slate-400">
        Waiting for participants...
      </div>
    );
  }

  return (
    <div className="grid h-full w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
      {tracks.map((track, index) => (
        <LKParticipantTile
          key={track.publication?.trackSid ?? index}
          trackRef={track}
          className="overflow-hidden rounded-3xl"
        />
      ))}
    </div>
  );
}

export default ParticipantGrid;