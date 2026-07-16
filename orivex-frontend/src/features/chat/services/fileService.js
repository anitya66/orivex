import api from "@/config/axios";

export async function uploadChatFile(file) {

  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/files/chat",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}