import { apiService } from "./apiService";

// Define story type
export interface Story {
  id: string;
  title: string;
  image: any;
  description?: string;
  author?: string;
  genre?: string;
  status?: string;
  chapters?: number;
}

export const getAllStories = async (params: any) => {
  const response = await apiService.get<Story[]>("/stories", params);
  return response;
};

export const getStoryById = async (id: string) => {
  const response = await apiService.get<Story>(`/stories/${id}`);
  return response;
};
