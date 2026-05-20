import axios from "axios";

const API = axios.create({
   baseURL: "http://localhost:5000/api/auth",
});

// SIGNUP API
export const signupUser = async (userData) => {

   const response = await API.post(
      "/signup",
      userData
   );

   return response.data;
};

// LOGIN API
export const loginUser = async (loginData) => {

   const response = await API.post(
      "/login",
      loginData
   );

   return response.data;
};