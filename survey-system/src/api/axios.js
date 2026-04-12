import axios from "axios";

const API = axios.create({
  baseURL: "https://survey-system-backend-x9wk.onrender.com/api",
});

export default API;