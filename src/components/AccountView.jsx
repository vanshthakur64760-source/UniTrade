import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Wallet, LogOut, Plus } from "lucide-react";

function AccountView({ showToast }) {
  // Directly extract state & actions from AppContext
  const { user, setUser, setCurrentView } = useContext(AppContext);
  const [customAmount, setCustomAmount] = useState("");

  // Ensure default fallback values so UI never breaks
  const userCredits = user?.credits !== undefined ? Number(user.credits) : 0;
  const userName = user?.name || user?.username || "Student";
  const userEmail = user?.email || "student@chitkara.edu.in";
  const initialLetter = userName.charAt(0).toUpperCase();

  const handleTopUp = (e) => {
    e.preventDefault();
    const amount = parseInt(customAmount, 10);

    if (isNaN(amount) || amount < 50) {
      if (showToast) showToast("Minimum top-up amount is 50 UC", "error");
      return;
    }
    if (amount > 100000) {
      if (showToast) showToast("Maximum top-up amount is 100,000 UC", "error");
      return;
    }

    const updatedUser = {
      ...user,
      credits: userCredits + amount
    };

    setUser(updatedUser);
    setCustomAmount("");
    if (showToast) showToast(`Successfully added ${amount} UC to your account!`, "success");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("auth");
    if (showToast) showToast("Logged out successfully", "success");
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
          background: "linear-gradient(135deg, var(--primary, #4f46e5) 0%, #312e81 100%)",
          width: "100%",
          borderRadius: "var(--radius-lg, 16px)",
          padding: "40px 30px",
          color: "white",
          textAlign: "center",
          boxShadow: "var(--shadow-md, 0 10px 25px rgba(0,0,0,0.1))",
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
          {initialLetter}
        </div>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "4px" }}>
          {userName}
        </h2>
        <p style={{ fontSize: "1rem", opacity: 0.9, marginBottom: "24px" }}>
          {userEmail}
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
          {userCredits} <span style={{ fontSize: "1.5rem" }}>UC</span>
        </div>
      </div>

      {/* Card 2: Top Up */}
      <div
        style={{
          background: "var(--bg-card, #ffffff)",
          width: "100%",
          padding: "30px",
          borderRadius: "var(--radius-lg, 16px)",
          border: "1px solid var(--border, #e5e7eb)",
          boxShadow: "var(--shadow-sm, 0 4px 6px rgba(0,0,0,0.05))",
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
          <Wallet size={20} color="var(--primary, #4f46e5)" /> Top Up Credits
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-muted, #6b7280)",
            marginBottom: "20px",
          }}
        >
          Add custom Uni Credits to your wallet to purchase items from other students.
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
          background: "var(--bg-card, #ffffff)",
          width: "100%",
          padding: "30px",
          borderRadius: "var(--radius-lg, 16px)",
          border: "1px solid #fca5a5",
          boxShadow: "var(--shadow-sm, 0 4px 6px rgba(0,0,0,0.05))",
        }}
      >
        <h3
          style={{
            fontSize: "1.2rem",
            marginBottom: "12px",
            color: "var(--error, #ef4444)",
            fontWeight: 600,
          }}
        >
          Account Security
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-muted, #6b7280)",
            marginBottom: "20px",
          }}
        >
          Log out of your account on this device to keep your Uni Credits secure.
        </p>

        <button
          className="btn btn-danger"
          style={{
            width: "100%",
            padding: "14px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
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