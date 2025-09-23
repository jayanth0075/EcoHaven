import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/accounts/register/", form);

      // store tokens
      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);

      api.setAuthToken(res.data.access);

      nav("/feed"); // after signup, go to feed
    } catch (err) {
      setError("Unable to register. Try different username/email.");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>Create an account</h2>
        <input placeholder="username" value={form.username}
               onChange={(e)=>setForm({...form, username: e.target.value})}/>
        <input placeholder="email" value={form.email}
               onChange={(e)=>setForm({...form, email: e.target.value})}/>
        <input placeholder="password" type="password" value={form.password}
               onChange={(e)=>setForm({...form, password: e.target.value})}/>
        {error && <div className="error">{error}</div>}
        <button className="btn-primary">Register</button>
      </form>
    </div>
  );
}
