// API helpers for auth and emotion endpoints
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const detectTextEmotion = (data, token) =>
  API.post("/emotion/text", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const detectFaceEmotion = (data, token) =>
  API.post("/emotion/face", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
