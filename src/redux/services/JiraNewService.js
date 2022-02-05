const { default: Axios } = require("axios");
const { DOMAIN } = require("../../GlobalSetting/domain");

export const jiraNewService = {
  jiraSignin: (userLogin) => {
    return Axios({
      url: `${DOMAIN}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  },
};
