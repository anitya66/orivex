import axiosInstance from "@/config/axios";

/* ==========================================
   LiveKit Token
========================================== */

export async function fetchLiveKitToken({

  roomName,

  participantIdentity,

  participantName,

}) {

  const { data } = await axiosInstance.post(

    "/call/token",

    {

      roomName,

      participantIdentity,

      participantName,

    }

  );

  return data;

}