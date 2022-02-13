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
};
