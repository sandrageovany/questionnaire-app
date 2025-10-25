import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { signup } from "../api";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form.username, form.email, form.password);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "Signup failed");
    }
  };

  return (
    <div style={{ marginTop: "100px", marginLeft: "350px" }}>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Username:</label>
          <input onChange={handleChange} type="text" name="username" value={form.username} />
        </div>
        <div>
          <label>Email:</label>
          <input onChange={handleChange} type="email" name="email" value={form.email} />
        </div>
        <div>
          <label>Password:</label>
          <input onChange={handleChange} type="password" name="password" value={form.password} />
        </div>
        <div>
          <button>Signup</button>
        </div>
      </form>
      <div>
        <p>
          Already have an account?
          <NavLink to="/login"> Login</NavLink>
        </p>
      </div>
    </div>
  );
}
