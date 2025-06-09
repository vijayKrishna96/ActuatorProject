import React, { useContext, useState } from "react";
import { AuthContext } from "../config/AuthComtext";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (!success) alert("Login failed. Check credentials.");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto mt-20">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </form>
  );
}