import React, { useState } from "react";
import { Wallet, LogOut, Plus } from "lucide-react";

function AccountView({ user, setUser, setCurrentView, showToast }) {
  const [customAmount, setCustomAmount] = useState("");

  const handleTopUp = (e) => {
    e.preventDefault();
    const amount = parseInt(customAmount);
    if (isNaN(amount) || amount < 50) {
      showToast("Minimum top-up amount is 50 UC", "error");
      return;
    }
    if (amount > 100000) {
      showToast("Maximum top-up amount is 100,000 UC", "error");
      return;
    }
    setUser({ ...user, credits: user.credits + amount });
    setCustomAmount("");
    showToast(`Successfully added ${amount} UC to your account!`, "success");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("auth");
    showToast("Logged out successfully");
  };

  return (
    <div
      className="fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        padding: "20px 0",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {/* Card 1: Profile Summary */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--primary) 0%, #312e81 100%)",
          width: "100%",
          borderRadius: "var(--radius-lg)",
          padding: "40px 30px",
          color: "white",
          textAlign: "center",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 16px auto",
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h2
          style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "4px" }}
        >
          {user?.name}
        </h2>
        <p style={{ fontSize: "1rem", opacity: 0.9, marginBottom: "24px" }}>
          {user?.email}
        </p>

        <div
          style={{
            fontSize: "0.9rem",
            opacity: 0.8,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Available Balance
        </div>
        <div style={{ fontSize: "4rem", fontWeight: 800 }}>
          {user?.credits} <span style={{ fontSize: "1.5rem" }}>UC</span>
        </div>
      </div>

      {/* Card 2: Top Up */}
      <div
        style={{
          background: "var(--bg-card)",
          width: "100%",
          padding: "30px",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <h3
          style={{
            fontSize: "1.2rem",
            marginBottom: "12px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Wallet size={20} color="var(--primary)" /> Top Up Credits
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-muted)",
            marginBottom: "20px",
          }}
        >
          Add custom Uni Credits to your wallet to purchase items from other
          students.
        </p>

        <form onSubmit={handleTopUp} style={{ display: "flex", gap: "12px" }}>
          <input
            type="number"
            min="50"
            max="100000"
            placeholder="Enter amount (50 - 100,000)"
            className="form-control"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            style={{ flex: 1 }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: "0 24px" }}
          >
            <Plus size={18} /> Add Credits
          </button>
        </form>
      </div>

      {/* Card 3: Danger Zone */}
      <div
        style={{
          background: "var(--bg-card)",
          width: "100%",
          padding: "30px",
          borderRadius: "var(--radius-lg)",
          border: "1px solid #fca5a5",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <h3
          style={{
            fontSize: "1.2rem",
            marginBottom: "12px",
            color: "var(--error)",
            fontWeight: 600,
          }}
        >
          Account Security
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-muted)",
            marginBottom: "20px",
          }}
        >
          Log out of your account on this device to keep your Uni Credits
          secure.
        </p>

        <button
          className="btn btn-danger"
          style={{
            width: "100%",
            padding: "14px",
            display: "flex",
            justifyContent: "center",
            fontSize: "1.05rem",
          }}
          onClick={handleLogout}
        >
          <LogOut size={18} /> Sign Out Safely
        </button>
      </div>
    </div>
  );
}

export default AccountView;
