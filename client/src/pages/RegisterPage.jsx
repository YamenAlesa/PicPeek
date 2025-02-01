import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateUsername = (input) => {
    const usernameRegex = /^[a-z0-9._-]+$/;
    return usernameRegex.test(input);
  };

  const handleUsernameChange = (event) => {
    const input = event.target.value;
    setUsername(input);

    if (!validateUsername(input)) {
      setUsernameError("Username can only contain lowercase letters, numbers, and symbols (.-_)");
    } else {
      setUsernameError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");
    setSuccessMessage("");

    if (
      usernameError ||
      !username ||
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      alert("Please fill all fields correctly");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4499/api/users", {
        username,
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccessMessage("Registration successful!");
        setUsername("");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Create your account
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Sign up with your email address to get started
        </p>
        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Create your account</p>

          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          <div className="flex gap-1">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter full name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter username"
                />
              </div>
              {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
            </div>
          </div>

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
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="sr-only">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign up
          </button>

          <div className=" flex text-center justify-center text-sm text-gray-500 gap-1">
            <p className="">Already have an account?</p>
            <a className=" gap-2 underline" href="/login">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
