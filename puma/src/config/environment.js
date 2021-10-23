module.exports = {
  configUser: () => {
    console.log(global);
    console.log(process.env);
    if (process.env.VUE_APP_ENVIRONMENT === 'dev') {
      /* eslint-disable  semi */
      global.URL_GATEWAY = `http://${process.env.VUE_APP_IP_ADDRESS}:3004`
    } else if (process.env.VUE_APP_ENVIRONMENT === 'prod') {
      /* eslint-disable  semi */
      global.URL_GATEWAY = `http://${process.env.VUE_APP_IP_ADDRESS}:3004`
    }
  },
};
