import api from "@/config/axios";

export async function getNotifications() {
  const response = await api.get("/notifications");
  return response.data;
}

export async function getUnreadCount() {
  const response = await api.get("/notifications/unread-count");
  return response.data;
}

export async function markNotificationRead(id) {
  const response = await api.put(
    `/notifications/${id}/read`
  );

  return response.data;
}

export async function markAllNotificationsRead() {
  const response = await api.put(
    "/notifications/read-all"
  );

  return response.data;
}