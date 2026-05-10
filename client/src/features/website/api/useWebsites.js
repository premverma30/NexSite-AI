import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/client";

export const useWebsites = (userId) => {
  return useQuery({
    queryKey: ["websites", userId],
    queryFn: () => apiClient.get("/api/website/get-all"),
    enabled: !!userId, // Only fetch if user is logged in
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

export const useWebsite = (id, userId) => {
  return useQuery({
    queryKey: ["website", id],
    queryFn: () => apiClient.get(`/api/website/get-by-id/${id}`),
    enabled: !!id && !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
