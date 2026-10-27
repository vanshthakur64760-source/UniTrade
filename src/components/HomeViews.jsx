import React from "react";
import {
  ArrowRight,
  PlusCircle,
  Tag,
  Handshake,
  Lock,
  ChevronRight,
} from "lucide-react";
import ItemCard from "./ItemCard";

function HomeViews({ user, items = [], setCurrentView }) {
  const recentItems = items.slice(0, 3);

  const displayName =
    user?.username ||
    user?.name ||
    (user?.email ? user.email.split("@")[0] : "Student");

  const userCredits = user?.credits ?? 100;

  return (
    <div
      className="fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "48px",
        paddingBottom: "40px",
      }}
    >
      {/* Section 1: Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
          background: "var(--bg-card)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50px",
            left: "-50px",
            width: "200px",
            height: "200px",
            background: "var(--primary-light)",
            borderRadius: "50%",
            opacity: 0.6,
            filter: "blur(40px)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            right: "-50px",
            width: "250px",
            height: "250px",
            background: "#e0f2fe",
            borderRadius: "50%",
            opacity: 0.6,
            filter: "blur(40px)",
          }}
        ></div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: 800,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome back,{" "}
            <span style={{ color: "var(--primary)" }}>{displayName}</span>
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              maxWidth: "600px",
              margin: "0 auto 32px auto",
              lineHeight: 1.6,
            }}
          >
            Trade textbooks, tech, and tutoring using Uni Credits (UC). You
            currently have <strong>{userCredits} UC</strong> available to spend.
          </p>
          <div
            style={{ display: "flex", gap: "16px", justifyContent: "center" }}
          >
            <button
              className="btn btn-primary"
              style={{ padding: "14px 28px", fontSize: "1.05rem" }}
              onClick={() => setCurrentView("marketplace")}
            >
              Explore Market <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-ghost"
              style={{
                padding: "14px 28px",
                fontSize: "1.05rem",
                border: "1px solid var(--border)",
                background: "white",
              }}
              onClick={() => setCurrentView("list_item")}
            >
              <PlusCircle size={18} /> List an Item
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: How It Works */}
      <div
        style={{
          margin: "0 auto",
          maxWidth: "1100px",
          width: "100%",
          paddingTop: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "2.2rem",
            fontWeight: 800,
          }}
        >
          How UniTrade Works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          <div
            style={{
              background: "var(--bg-card)",
              padding: "40px 32px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              textAlign: "center",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                background: "var(--primary-light)",
                color: "var(--primary)",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 24px auto",
              }}
            >
              <Tag size={36} />
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                marginBottom: "12px",
                fontWeight: 700,
              }}
            >
              1. List Your Items
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
              }}
            >
              Got old textbooks or tech? List them on the marketplace and set
              your price in Uni Credits.
            </p>
          </div>

          <div
            style={{
              background: "var(--bg-card)",
              padding: "40px 32px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              textAlign: "center",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                background: "#e0f2fe",
                color: "#0369a1",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 24px auto",
              }}
            >
              <Handshake size={36} />
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                marginBottom: "12px",
                fontWeight: 700,
              }}
            >
              2. Trade or Sell
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
              }}
            >
              Accept Uni Credits for your items, or propose direct item-for-item
              trades with other students.
            </p>
          </div>

          <div
            style={{
              background: "var(--bg-card)",
              padding: "40px 32px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              textAlign: "center",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                background: "#fef3c7",
                color: "#b45309",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 24px auto",
              }}
            >
              <Lock size={36} />
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                marginBottom: "12px",
                fontWeight: 700,
              }}
            >
              3. Campus Secure
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
              }}
            >
              Meet up on campus for safe exchanges. Our community is verified
              for current students only.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Recent Listings Preview */}
      <div
        style={{
          margin: "0 auto",
          maxWidth: "1400px",
          width: "100%",
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "32px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                marginBottom: "8px",
              }}
            >
              Fresh on Campus
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
              Recently listed items by your peers.
            </p>
          </div>
          <button
            className="btn btn-ghost"
            style={{ background: "white", border: "1px solid var(--border)" }}
            onClick={() => setCurrentView("marketplace")}
          >
            View All <ChevronRight size={18} />
          </button>
        </div>

        <div
          className="item-grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {recentItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              user={user}
              variant="home"
              onClick={() => setCurrentView("marketplace")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeViews;