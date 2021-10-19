require('dotenv').config();

module.exports = {
  configUser: () => {
    if (process.env.ENVIRONMENT === 'dev') {
      global.URL_GATEWAY = 'http://localhost:3004';
    } else if (process.env.ENVIRONMENT === 'prod') {
      global.URL_GATEWAY = `http://${process.env.IP_ADDRESS}:3004`;
    }
  },
};
