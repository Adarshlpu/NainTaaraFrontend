import axios from "axios";

const API = axios.create({
   baseURL: "http://localhost:5000/api/auth",
});


// Auto Token Attach
API.interceptors.request.use((req)=>{
   const token  = localStorage.getItem("token");
   if(token){
      req.headers.Authorization = `Bearer ${token}`;

   }
   return req;
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

    // save token
   localStorage.setItem(
      "token",
      response.data.token
   );

   // save user
   localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)

   );


   return response.data;
};

// profile API
 export const getProfile = async () =>{
   const response = await API.get(
      "/profile"

   );
   return response.data;
 };

 export default API