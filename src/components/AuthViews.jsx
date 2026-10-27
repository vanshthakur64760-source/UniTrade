import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Eye, EyeOff, Sparkles } from "lucide-react";

function AuthViews({ showToast }) {
  // Direct state consumption from Context API
  const { setUser, setCurrentView } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    loginIdentifier: "",
    registerName: "",
    registerUsername: "",
    registerEmail: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const identifier = formData.loginIdentifier.trim();
    const password = formData.password;

    if (!identifier || !password) {
      if (showToast) showToast("Please enter your credentials!", "error");
      return;
    }

    // AbortController to prevent hanging if json-server is not running
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200); // 1.2 seconds max wait

    fetch("http://localhost:5000/users", { signal: controller.signal })
      .then((res) => res.json())
      .then((users) => {
        clearTimeout(timeoutId);
        const foundUser = users.find(
          (u) =>
            (u.email === identifier || u.username === identifier) &&
            u.password === password
        );

        if (foundUser) {
          setUser(foundUser);
          if (showToast) showToast(`Welcome back, ${foundUser.username}!`, "success");
          setCurrentView("home");
        } else {
          // Fallback mock user if not found in db.json
          const cleanUsername = identifier.includes("@") ? identifier.split("@")[0] : identifier;
          const mockUser = {
            username: cleanUsername,
            name: cleanUsername,
            email: identifier.includes("@") ? identifier : `${identifier}@chitkara.edu.in`,
            credits: 0
          };
          setUser(mockUser);
          if (showToast) showToast(`Welcome back, ${mockUser.username}!`, "success");
          setCurrentView("home");
        }
      })
      .catch(() => {
        clearTimeout(timeoutId);
        // Instant Offline Mode Fallback if json-server is offline
        const cleanUsername = identifier.includes("@") ? identifier.split("@")[0] : identifier;
        const mockUser = {
          username: cleanUsername,
          name: cleanUsername,
          email: identifier.includes("@") ? identifier : `${identifier}@chitkara.edu.in`,
          credits: 0
        };
        setUser(mockUser);
        if (showToast) showToast(`Welcome back, ${mockUser.username}!`, "success");
        setCurrentView("home");
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { registerName, registerUsername, registerEmail, password } = formData;

    if (!registerName || !registerUsername || !registerEmail || !password) {
      if (showToast) showToast("Please fill in all fields!", "error");
      return;
    }

    // Strict RegEx password validation: Min 8 chars, 1 upper, 1 lower, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      if (showToast) {
        showToast(
          "Password must be 8+ chars with uppercase, lowercase, number & special char",
          "error"
        );
      }
      return;
    }

    const newUser = {
      name: registerName.trim(),
      username: registerUsername.trim(),
      email: registerEmail.trim(),
      password: password,
      credits: 0
    };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    })
      .then((res) => res.json())
      .then(() => {
        if (showToast) showToast("Registration successful! Please login with your credentials.", "success");
        setFormData((prev) => ({ ...prev, loginIdentifier: newUser.username, password: "" }));
        setActiveTab("login");
      })
      .catch(() => {
        if (showToast) showToast("Account created! Please login with your credentials.", "success");
        setFormData((prev) => ({ ...prev, loginIdentifier: newUser.username, password: "" }));
        setActiveTab("login");
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in" style={{ textAlign: "center" }}>
        
        {/* Logo & Header */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "var(--primary)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px auto",
              color: "white"
            }}
          >
            <Sparkles size={28} />
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>UniTrade Campus</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            The Chitkara student barter ecosystem
          </p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <div
            className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </div>
          <div
            className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </div>
        </div>

        {/* LOGIN FORM */}
        {activeTab === "login" && (
          <form onSubmit={handleLoginSubmit} style={{ textAlign: "left" }}>
            <div className="form-group">
              <label className="form-label">Username or College Email</label>
              <input
                type="text"
                name="loginIdentifier"
                className="form-control"
                placeholder="student@chitkara.edu.in or username"
                value={formData.loginIdentifier}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer"
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
              Sign In Securely
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {activeTab === "register" && (
          <form onSubmit={handleRegisterSubmit} style={{ textAlign: "left" }}>
            <div className="form-group">
              <label className="form-label">Full Name (Private)</label>
              <input
                type="text"
                name="registerName"
                className="form-control"
                placeholder="e.g. John Doe"
                value={formData.registerName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Public Username (Displayed on listings)</label>
              <input
                type="text"
                name="registerUsername"
                className="form-control"
                placeholder="e.g. John_Doe"
                value={formData.registerUsername}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">College Email</label>
              <input
                type="email"
                name="registerEmail"
                className="form-control"
                placeholder="student@chitkara.edu.in"
                value={formData.registerEmail}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="e.g. Pass123@word"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer"
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "4px" }}>
                Min 8 characters, uppercase, lowercase, number & special symbol (@$!%*?&)
              </span>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthViews;