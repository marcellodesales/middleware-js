
// The implementation can be ISPConf, NConf, or anything else
module.exports = {
  isp: {
    logging: {
      console: {
        level: "debug",
        format: "short"
      }
    },
    monitoring: {
      type: "newrelic",
      ENABLED: true,
      PROXY: "http://proxy.newrelic.com"
    },
    http: {
      client: {
        timeout: 250
      }
    }
  },
  superApp: {
    server: {
      secure: true
    },
    done: "yes"
  }
};
