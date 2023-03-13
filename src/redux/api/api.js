import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://strapi.cleverland.by/api/',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('JWT');
  const req = config;

  req.headers.Authorization = token ? `Bearer ${token}` : '';

  return req;
});
