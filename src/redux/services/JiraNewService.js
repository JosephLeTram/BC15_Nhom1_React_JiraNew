const { default: Axios } = require("axios");
const {
  DOMAIN,
  TOKEN_CYBERSOFT,
  TOKEN_AUTHORIZATION,
} = require("../../GlobalSetting/domain");

export const jiraNewService = {
  jiraSignin: (userLogin) => {
    return Axios({
      url: `${DOMAIN}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  },

  // Get Project Category

  getAllProjectCategory: () => {
    return Axios({
      url: `${DOMAIN}/ProjectCategory`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Create Project with Authorization Token
  createProjectAuthorization: (newProject) => {
    return Axios({
      url: `${DOMAIN}/Project/createProjectAuthorize`,
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
      data: newProject,
    });
  },

  // Get a list of all projects
  getProjectList: () => {
    return Axios({
      url: `${DOMAIN}/Project/getAllProject`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Update Project
  updateProject: (projectUpdated) => {
    return Axios({
      url: `${DOMAIN}/Project/updateProject?projectId=${projectUpdated.id}`,
      method: "PUT",
      data: projectUpdated,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Delete Project
  deleteProject: (projectDeleted) => {
    return Axios({
      url: `${DOMAIN}/Project/deleteProject?projectId=${projectDeleted.id}`,
      method: "DELETE",
      data: projectDeleted,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  //Search User
  searchUser: (keyWord) => {
    return Axios({
      url: `${DOMAIN}/Users/getUser?keyword=${keyWord}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  //Search User By Project ID
  searchUserByProjectId: (projectId) => {
    return Axios({
      url: `${DOMAIN}/Users/getUserByProjectId?idProject=${projectId}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Get All User
  getAllUser: () => {
    return Axios({
      url: `${DOMAIN}/Users/getUser`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Assign User to Project
  assignUserToProject: (userProject) => {
    return Axios({
      url: `${DOMAIN}/Project/assignUserProject`,
      method: "POST",
      data: userProject,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Remove User from Project
  removeUserFromProject: (userProject) => {
    return Axios({
      url: `${DOMAIN}/Project/removeUserFromProject`,
      method: "POST",
      data: userProject,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Get Project Detail
  getProjectDetail: (projectId) => {
    return Axios({
      url: `${DOMAIN}/Project/getProjectDetail?id=${projectId}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Get All Task Type
  getAllTaskType: () => {
    return Axios({
      url: `${DOMAIN}/TaskType/getAll`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  // Get All Prority Type
  getAllPriorityType: () => {
    return Axios({
      url: `${DOMAIN}/Priority/getAll`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  //Create Task
  createTask: (taskObject) => {
    return Axios({
      url: `${DOMAIN}/Project/createTask`,
      method: "POST",
      data: taskObject,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Get Task Detail
  getTaskDetail: (taskId) => {
    return Axios({
      url: `${DOMAIN}/Project/getTaskDetail?taskId=${taskId}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  //update Task
  updateTask: (taskUpdate) => {
    return Axios({
      url: `${DOMAIN}/Project/updateTask`,
      method: "POST",
      data: taskUpdate,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  //update Task Status:
  updateTaskStatus: (taskUpdateModel) => {
    return Axios({
      url: `${DOMAIN}/Project/updateStatus`,
      method: "PUT",
      data: taskUpdateModel,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Status ID Service
  getAllStatusType: () => {
    return Axios({
      url: `${DOMAIN}/Status/getAll`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
};
