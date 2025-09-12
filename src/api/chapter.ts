import { apiService } from "./apiService";

export const getChapterById = async (chapterId: string) => {
  const response = await apiService.get(`/chapters/${chapterId}`);
  return response;
};
