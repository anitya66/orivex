import { useEffect, useState } from "react";

export default function useCallTimer() {

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setSeconds((prev) => prev + 1);

    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const hours = Math.floor(seconds / 3600);

  const minutes = Math.floor((seconds % 3600) / 60);

  const secs = seconds % 60;

  const formatted =

    hours > 0

      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`

      : `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return formatted;

}