import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setCurrentUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await login(form.email, form.password);
      const user = res.data.user; // ✅ extract user from response

      if (!user) {
        setMessage("No user data returned from server");
        return;
      }

      // ✅ Save user to localStorage and state
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      navigate("/questionnaire");
      setMessage(`${res.data.message || "Login successful!"}`);
      console.log("User:", user);
    } catch (err) {
      console.error(err);
      setMessage(`${err.response?.data?.message || "Login failed"}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

