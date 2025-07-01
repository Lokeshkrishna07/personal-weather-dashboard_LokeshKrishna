import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await request("/auth/login", "POST", { email, password });
      localStorage.setItem("token", res.access_token);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
}
