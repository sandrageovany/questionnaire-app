// client/src/api.js
import axios from "axios";

const API_AUTH_URL = "http://localhost:4000/api/auth";
const API_BASE_URL = "http://localhost:4000/api";

export async function signup(username, email, password) {
    return axios.post(`${API_AUTH_URL}/signup`, { username, email, password });
  }
  
  export async function login(email, password) {
    return axios.post(`${API_AUTH_URL}/login`, { email, password });
  }

export async function fetchQuestions() {
  const res = await axios.get(`${API_BASE_URL}/questions`);
  return res.data;
}

export async function submitScore(username, score) {
  const res = await axios.post(`${API_BASE_URL}/scores`, { username, score });
  return res.data;
}

export async function fetchHighestScore() {
  const res = await axios.get(`${API_BASE_URL}/scores/highest`);
  return res.data;
}