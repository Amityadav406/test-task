const dev = {
  BASE_URL: "http://localhost:8001/",
};

const prod = {
  BASE_URL: "http://localhost:8001/",
};
// - Default to dev if not set
const ENV = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default ENV;
