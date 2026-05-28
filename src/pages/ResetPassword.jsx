import React, { useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

const ResetPassword = () => {

  const { token } = useParams();

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          token,
          password,
        }
      );

      alert(res.data.message);

    } catch(error){

      console.log(error);

      alert("Reset failed");

    }

  };

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >

      <h1>Reset Password</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Reset Password
        </button>

      </form>

    </div>

  );

};

export default ResetPassword;