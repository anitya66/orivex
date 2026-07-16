import { useConnectionQualityIndicator } from "@livekit/components-react";

export default function useNetworkQuality() {

  const quality = useConnectionQualityIndicator();

  function getLabel() {

    switch (quality) {

      case "excellent":
        return {
          text: "Excellent",
          color: "text-green-400",
        };

      case "good":
        return {
          text: "Good",
          color: "text-yellow-400",
        };

      case "poor":
        return {
          text: "Poor",
          color: "text-red-500",
        };

      default:
        return {
          text: "Unknown",
          color: "text-slate-400",
        };

    }

  }

  return getLabel();

}