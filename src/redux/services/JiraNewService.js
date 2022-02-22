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

  // Get all project list
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
};
