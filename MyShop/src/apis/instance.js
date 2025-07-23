import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.log("401: 토큰 만료 또는 인증 오류");
      //토큰 재발급 로직 추후 구현

    } else if (status === 500) {
      console.log("500: 서버 내부 오류");
    }

    return Promise.reject(error);
  },
);
export default instance;
