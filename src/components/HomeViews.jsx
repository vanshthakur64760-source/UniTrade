import React from "react";
import { ArrowRight, PlusCircle, Tag, Handshake, Lock } from "lucide-react";

function HomeViews({ user, setCurrentView }) {
  // Extract name robustly from user object
  const displayName = user?.username || user?.name || (user?.email ? user.email.split("@")[0] : "Student");
  const userCredits =
    user?.credits !== undefined && user?.credits !== null
      ? Number(user.credits)
      : 100;

  return (
    <div
      className="fade-in"
      style={{ display: "flex", flexDirection: "column", gap: "48px" }}
    >
      <div
        className="auth-card"
        style={{ maxWidth: "100%", textAlign: "center", padding: "60px 20px" }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "16px" }}>
          Welcome back,{" "}
          <span style={{ color: "var(--primary)" }}>{displayName}</span>
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            maxWidth: "600px",
            margin: "0 auto 32px auto",
          }}
        >
          Trade textbooks, tech, and services securely inside Chitkara using Uni
          Credits (UC). You currently have <strong>{userCredits} UC</strong>.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button
            className="btn btn-primary"
            onClick={() => setCurrentView && setCurrentView("marketplace")}
          >
            Explore Market <ArrowRight size={18} />
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => setCurrentView && setCurrentView("list_item")}
          >
            <PlusCircle size={18} /> List an Item
          </button>
        </div>
      </div>

      <div className="item-grid">
        <div
          className="auth-card"
          style={{ maxWidth: "100%", textAlign: "center" }}
        >
          <Tag
            size={36}
            style={{ color: "var(--primary)", marginBottom: "16px" }}
          />
          <h3
            style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}
          >
            List Campus Gear
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Post your old books, lab kits, or notes instantly.
          </p>
        </div>
        <div
          className="auth-card"
          style={{ maxWidth: "100%", textAlign: "center" }}
        >
          <Handshake
            size={36}
            style={{ color: "#0369a1", marginBottom: "16px" }}
          />
          <h3
            style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}
          >
            Peer-to-Peer Trades
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Negotiate directly with fellow students safely.
          </p>
        </div>
        <div
          className="auth-card"
          style={{ maxWidth: "100%", textAlign: "center" }}
        >
          <Lock size={36} style={{ color: "#b45309", marginBottom: "16px" }} />
          <h3
            style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}
          >
            Secure Credits
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Seamless wallet transactions using Uni Credits.
          </p>
        </div>
      </div>
    </div>
  );
}

HomeViews.defaultProps = {
  user: null,
};

export default HomeViews;