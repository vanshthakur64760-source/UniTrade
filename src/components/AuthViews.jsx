import React, { useState } from "react";
import { Sparkles, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

function AuthViews({ setUser, setCurrentView, showToast }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Structured Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});

  // Universal Input Change Handler with Error Clearing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this specific field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!passRegex.test(formData.password)) {
      newErrors.password = "Min 6 chars, at least 1 letter and 1 number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (!isLogin) {
        showToast("Account created successfully! Please log in.", "success");
        setIsLogin(true);
        // Reset password field after registration switch
        
        setFormData((prev) => ({ ...prev, password: "" }));
      } else {
        const userData = {
          name: formData.email.split("@")[0],
          email: formData.email,
          credits: 100, // Starting bonus credits for campus trade!
        };

        setUser(userData);
        setCurrentView("home");
        showToast(`Welcome to UniTrade, ${userData.name}!`);
      }
    }
  };

  return (
    <div className="fade-in auth-container">
      <div className="auth-card">
        {/* Header Branding */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              background: "var(--primary)",
              color: "white",
              padding: "12px",
              borderRadius: "12px",
              display: "inline-block",
              marginBottom: "16px",
            }}
          >
            <Sparkles size={32} />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
            UniTrade Campus
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            The Chitkara student barter ecosystem
          </p>
        </div>

        {/* Auth Toggle Tabs */}
        <div className="auth-tabs">
          <div
            className={`auth-tab ${isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(true);
              setErrors({});
            }}
          >
            Login
          </div>
          <div
            className={`auth-tab ${!isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(false);
              setErrors({});
            }}
          >
            Register
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: "relative" }}>
                <User
                  size={18}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "14px",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  style={{ paddingLeft: "40px" }}
                  placeholder="Rahul Sharma"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">College Email</label>
            <div style={{ position: "relative" }}>
              <Mail
                size={18}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "14px",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="email"
                name="email"
                className="form-control"
                style={{ paddingLeft: "40px" }}
                placeholder="student@chitkara.edu.in"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "14px",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                style={{ paddingLeft: "40px", paddingRight: "40px" }}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "12px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <div className="form-error">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "14px", fontSize: "1rem", marginTop: "10px" }}
          >
            {isLogin ? "Sign In Securely" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthViews;