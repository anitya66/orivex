import api from "@/config/axios";

export async function getAllUsers({

  page = 0,
  size = 10,
  keyword = "",
  role = "",
  status = "",

} = {}) {

  const params = {
    page,
    size,
  };

  if (keyword) {
    params.keyword = keyword;
  }

  if (role) {
    params.role = role;
  }

  if (status) {
    params.status = status;
  }

  const { data } = await api.get(
    "/admin/users",
    {
      params,
    }
  );

  return data;
}

export async function getUserDetails(userId) {

  const { data } = await api.get(
    `/admin/users/${userId}`
  );

  return data;

}

export async function updateUserStatus(
  userId,
  status
) {
  const { data } = await api.patch(
    `/admin/users/${userId}/status`,
    {
      status,
    }
  );

  return data;
}

export async function deleteUser(userId) {

  const { data } = await api.delete(

    `/admin/users/${userId}`

  );

  return data;

}

export async function getProjects({

  page = 0,

  size = 10,

  keyword = "",

  status = "",

} = {}) {

  const params = {

    page,

    size,

  };

  if (keyword) {

    params.keyword = keyword;

  }

  if (status) {

    params.status = status;

  }

  const { data } = await api.get(

    "/admin/projects",

    {

      params,

    }

  );

  return data;

}

export async function getProjectDetails(projectId) {

  const { data } = await api.get(

    `/admin/projects/${projectId}`

  );

  return data;

}

export async function updateProjectStatus(

  projectId,

  status,

) {

  const { data } = await api.patch(

    `/admin/projects/${projectId}/status`,

    {

      status,

    }

  );

  return data;

}

export async function deleteProject(

  projectId,

) {

  const { data } = await api.delete(

    `/admin/projects/${projectId}`

  );

  return data;

}

export async function getDashboard() {

  const { data } = await api.get(
    "/admin/dashboard"
  );

  return data;

}

export async function getRecentActivities() {

  const { data } = await api.get(
    "/admin/activities"
  );

  return data;

}