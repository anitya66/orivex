import axiosInstance from "@/config/axios";
import { API } from "@/constants/api";

export async function getProjects(params) {
  const response = await axiosInstance.get(
    API.PROJECTS.GET_ALL,
    {
      params,
    }
  );

  return response.data;
}

export async function createProject(projectData) {
  const response = await axiosInstance.post(
    API.PROJECTS.CREATE,
    projectData
  );

  return response.data;
}

export async function getMyProjects() {
  const response = await axiosInstance.get(
    API.PROJECTS.MY
  );

  return response.data;
}

export async function getProjectById(id) {
  const response = await axiosInstance.get(
    `${API.PROJECTS.GET_BY_ID}/${id}`
  );

  return response.data;
}