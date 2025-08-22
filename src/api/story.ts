import { apiService } from "./apiService";

export const getAllStories = async (params: any) => {
  const response = await apiService.get("/stories", params);
  return response;
};
