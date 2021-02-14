import packagejson from "../package.json";
const heimdalConfig = {
  GILL_BASE_API_URL: process.env.GILL_BASE_API_URL || "https://api.nemopay.net",
  NEMOPAY_VERSION: process.env.NEMOPAY_VERSION || "2019-06-26",
  GILL_APP_KEY: process.env.GILL_APP_KEY || "YOUR_GILL_API_KEY",
  SENTRY_DSN:
    process.env.SENTRY_DSN ||
    "https://8ae1c2142c714e2784f38e9080503348@sentry.io/1792330"
  // APM: {
  //   serviceName: packagejson.name,
  //   serverUrl: "http://apm.crichard.fr",
  //   serviceVersion: packagejson.version,
  //   environment: process.env.NODE_ENV
  // }
};
export default heimdalConfig;
