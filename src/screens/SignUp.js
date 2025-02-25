import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://foodiee-web-app-backend.onrender.com/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    } else {
      navigate("/login");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <div className="card p-4 shadow-lg border-0 glass-card">
        <h2 className="text-center mb-4 text-primary fw-bold">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">User Name</label>
            <input
              type="text"
              className="form-control rounded-pill"
              name="name"
              value={credentials.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control rounded-pill"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
            <div className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <input
              type="text"
              className="form-control rounded-pill"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-pill shadow-sm">
            Sign Up
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none fw-bold text-danger">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
