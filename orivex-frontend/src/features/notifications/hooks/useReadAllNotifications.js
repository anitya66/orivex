import { useMutation } from "@tanstack/react-query";

import { markAllNotificationsRead } from "../api/notificationApi";

export function useReadAllNotifications() {
  return useMutation({
    mutationFn: markAllNotificationsRead,
  });
}