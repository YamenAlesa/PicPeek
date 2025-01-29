import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4499/api/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setSuccessMessage("Login successful!");
        navigate("/user/profile");
        dispatch(login(response.data.user));
      }
    } catch (error) {
      setErrorMessage("Invalid email or password.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Login</h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Enter your email and password to log in.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          {errorMessage && <p className="text-center text-red-600">{errorMessage}</p>}
          {successMessage && <p className="text-center text-green-600">{successMessage}</p>}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
          <div className="flex text-center justify-center gap-2 text-sm text-gray-500">
            <p>No account?</p>
            <a className="underline" href="/auth/register">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
