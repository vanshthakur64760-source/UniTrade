import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Wallet, Plus, LogOut } from "lucide-react";

function AccountView({ showToast }) {
  const { user, setUser, setCurrentView } = useContext(ThemeContext);
  const [topUpAmount, setTopUpAmount] = useState("");

  const currentCredits =
    user?.credits !== undefined && user?.credits !== null
      ? Number(user.credits)
      : 100;

  const handleTopUp = (e) => {
    e.preventDefault();
    const amount = Number(topUpAmount);
    if (!amount || amount <= 0) {
      if (showToast) showToast("Enter a valid amount", "error");
      return;
    }

    setUser({ ...user, credits: currentCredits + amount });
    setTopUpAmount("");
    if (showToast) showToast(`Added ${amount} UC to your account!`, "success");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("auth");
    if (showToast) showToast("Logged out successfully");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "24px" }}>
        Account Settings
      </h2>

      <div
        className="auth-card"
        style={{ maxWidth: "100%", marginBottom: "20px", padding: "24px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "var(--primary)",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            {user?.username ? user.username.charAt(0).toUpperCase() : "A"}
          </div>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
              {user?.username || "Atharav Sharma"}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {user?.email || "atharav@chitkara.edu.in"}
            </p>
          </div>
        </div>
      </div>

      <div
        className="auth-card"
        style={{ maxWidth: "100%", marginBottom: "20px", padding: "24px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          <Wallet size={20} style={{ color: "var(--primary)" }} />
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
            Uni Credits Wallet
          </h3>
        </div>
        <p
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--primary)",
            marginBottom: "16px",
          }}
        >
          {currentCredits}{" "}
          <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
            UC Available
          </span>
        </p>

        <form onSubmit={handleTopUp} style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            className="form-control"
            placeholder="Enter UC amount (e.g. 500)"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ whiteSpace: "nowrap" }}
          >
            <Plus size={16} /> Add Credits
          </button>
        </form>
      </div>

      <button
        onClick={handleLogout}
        className="btn btn-danger"
        style={{ width: "100%", justifyContent: "center", padding: "12px" }}
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}

export default AccountView;
