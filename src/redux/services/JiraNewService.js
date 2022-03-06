const { default: Axios } = require("axios");
const {
  DOMAIN,
  TOKEN_CYBERSOFT,
  TOKEN_AUTHORIZATION,
} = require("../../GlobalSetting/domain");

export const jiraNewService = {
  //User Section
  // Get List of User
  getUserList: () => {
    return Axios({
      url: `${DOMAIN}/Users/getUser`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  // User Create
  createUser: (userCreateModel) => {
    return Axios({
      url: `${DOMAIN}/Users/signup`,
      method: "POST",
      data: userCreateModel,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Delete User
  deleteUser: (deletedUserId) => {
    return Axios({
      url: `${DOMAIN}/Users/deleteUser?id=${deletedUserId}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // User Signin/Login
  jiraSignin: (userLogin) => {
    return Axios({
      url: `${DOMAIN}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  },

  //User Update
  updateUser: (userUpdated) => {
    return Axios({
      url: `${DOMAIN}/Users/editUser`,
      method: "PUT",
      data: userUpdated,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
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

  // Delete Task:
  deleteTask: (taskId) => {
    return Axios({
      url: `${DOMAIN}/Project/removeTask?taskId=${taskId}`,
      method: "DELETE",
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

  // Comment Section
  // Get All Comments
  getAllComment: (taskId) => {
    return Axios({
      url: `${DOMAIN}/Comment/getAll?taskId=${taskId}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  // Insert New Comment
  insertNewComment: (commentModel) => {
    return Axios({
      url: `${DOMAIN}/Comment/insertComment`,
      method: "POST",
      data: commentModel,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Delete a comment
  deleteComment: (idComment) => {
    return Axios({
      url: `${DOMAIN}/Comment/deleteComment?idComment=${idComment}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  // Update a comment
  updateComment: (commentUpdateModel) => {
    return Axios({
      url: `${DOMAIN}/Comment/updateComment?id=${commentUpdateModel.id}&contentComment=${commentUpdateModel.contentComment}`,
      method: "PUT",
      data: commentUpdateModel,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_AUTHORIZATION),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
};
