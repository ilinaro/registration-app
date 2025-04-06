import axios, { InternalAxiosRequestConfig } from "axios";

export const API_URL = process.env.VITE_APP_API_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

const token = localStorage.getItem("token");

$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
