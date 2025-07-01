import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await request("/auth/register", "POST", { email, password });
      alert(res.msg);
      if (res.msg === "User registered") navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
