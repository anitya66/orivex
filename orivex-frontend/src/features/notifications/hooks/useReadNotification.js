import { useMutation } from "@tanstack/react-query";

import { markNotificationRead } from "../api/notificationApi";

export function useReadNotification() {
  return useMutation({
    mutationFn: markNotificationRead,
  });
}