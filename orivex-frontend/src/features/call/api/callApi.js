import api from "@/config/axios";

/* ===========================
   Get LiveKit Token
=========================== */

export async function getCallToken(
  roomName
) {

  const { data } = await api.get(
    "/call/token",
    {
      params: {
        roomName,
      },
    }
  );

  return data;

}