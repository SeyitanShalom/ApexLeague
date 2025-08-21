"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("adminToken", data.token);
        router.push("/admin");
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-164">
      <div className="flex flex-col items-center bg-white p-6 rounded-md shadow-md w-[350px]">
        <h1 className="font-semibold text-2xl mb-5">Login</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col mb-4">
            <p>Username:</p>
            <input
              className="px-3 border-1 rounded-sm border-gray-200 bg-white text-sm py-1"
              type="text"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="flex flex-col mb-4">
            <p>Password:</p>
            <input
              className="px-3 border-1 rounded-sm border-gray-200 bg-white text-sm py-1"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            className="bg-green-700 text-white w-full py-2 px-4 rounded-md cursor-pointer hover:bg-green-600 transition-all duration-300 my-3"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
