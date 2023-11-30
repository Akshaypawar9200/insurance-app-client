'use client'
import React from "react";
import { login as userLogin } from "../lib/login/login";
import "./globals.css";
import { useState } from "react";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { MessageError, MessageSuccess } from "../error/Error";
import ValidationError from "../sharedcomponent/error/validationError";
import Spinner from "../sharedcomponent/spinner/Spinner";
import { useRouter } from "next/navigation";
import Navbar from "@/sharedcomponent/navbar/Navbar";




const page = () => {
  const router = useRouter()

  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState()
  const [loader, setLoader] = useState(false)



  const validateUsername = (e) => {
    setUsername(e.target.value);
  };
  const validatePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLogin = async (e) => {
    try {

      e.preventDefault();
      setLoader(prev => true)
      if (userName == "") {
        throw new ValidationError("plz enter username")

      }
      if (password.length == "") {
        throw new ValidationError("plz enter password")
      }
      const response = await userLogin(userName, password, role);
      console.log(response);
      localStorage.setItem("auth", response.headers.auth);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("role", response.data.role);

      if (!response?.data.id) {
        throw new Error("invalid credential")

      }
      if (response.data.role == "Employee") {

        MessageSuccess("login sucessful")

        router.push('/employeedashboard');

      }
      if (response.data.role == "Admin") {
        MessageSuccess("login sucessful")
        router.push("/admindashboard");
      }
      if (response.data.role == "Agent") {
        MessageSuccess("login sucessful")

        router.push('/agent');
      }

      if (response.data.role == "Customer") {
        MessageSuccess("login sucessful")

        router.push('/customer');

      }
    }
    catch (error) {

      enqueueSnackbar("login failed", { variant: "error" });

    }
    finally {
      setLoader(prev => false)
    }

  };
  

  return (
    <>
      <Spinner loader={loader} />
      <SnackbarProvider autoHideDuration={3000} />
    {/* <Navbar/> */}

      <div class="login-container">
        <form action="#" method="post" class="login-form">
          <h2>Login</h2>
          <div class="input-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" onChange={validateUsername} required />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" onChange={validatePassword} required />
          </div>
          <div class="input-group">
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={handleRoleChange} required>
              <option value="" >Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Agent">Agent</option>npm 
              <option value="Customer">Customer</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
      </div>

    </>
  );
};

export default page;