import {
  ParticipantTile as LKParticipantTile,
  useTracks,
} from "@livekit/components-react";

import { Track } from "livekit-client";

function ParticipantGrid() {
  const tracks = useTracks([
    {
      source: Track.Source.Camera,
      withPlaceholder: true,
    },
  ]);

  if (!tracks.length) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-center text-slate-400">
        Waiting for participants...
      </div>
    );
  }

  const participantCount = tracks.length;

  let gridClass =
    "grid-cols-1";

  if (participantCount === 2) {
    gridClass =
      "grid-cols-1 md:grid-cols-2";
  } else if (
    participantCount >= 3 &&
    participantCount <= 4
  ) {
    gridClass =
      "grid-cols-2";
  } else if (participantCount > 4) {
    gridClass =
      "grid-cols-2 lg:grid-cols-3";
  }

  return (
    <div
      className={`grid h-full w-full gap-3 p-3 sm:gap-4 sm:p-4 ${gridClass}`}
    >
      {tracks.map((track, index) => (
        <div
          key={
            track.publication?.trackSid ??
            index
          }
          className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl"
        >
          <LKParticipantTile
            trackRef={track}
            className="h-full w-full"
          />
        </div>
      ))}
    </div>
  );
}

export default ParticipantGrid;