import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createProject } from "../services/projectService";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      toast.success("Project created successfully.");

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create project."
      );
    },
  });
}