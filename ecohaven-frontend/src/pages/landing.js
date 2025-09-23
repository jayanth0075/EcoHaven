import React from "react";

const Landing = () => {
  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", padding: "40px" }}>
      <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "green" }}>
        Welcome to EcoHaven 🌿
      </h1>
      <p style={{ fontSize: "18px", color: "#555", maxWidth: "600px", margin: "20px auto" }}>
        EcoHaven is a community-driven platform that empowers young people to live
        sustainably, share eco-friendly tips, and track their progress towards a
        greener lifestyle.
      </p>

      <div style={{ marginTop: "40px" }}>
        <a
          href="/register"
          style={{
            margin: "10px",
            padding: "12px 24px",
            background: "green",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Get Started
        </a>
        <a
          href="/login"
          style={{
            margin: "10px",
            padding: "12px 24px",
            border: "2px solid green",
            color: "green",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Login
        </a>
      </div>

      <div style={{ marginTop: "60px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "green" }}>About EcoHaven</h2>
        <p style={{ fontSize: "16px", color: "#555", maxWidth: "600px", margin: "20px auto" }}>
          EcoHaven was founded in 2023 with a mission to inspire and support a global community
          dedicated to sustainability and wellness. Our platform combines cutting-edge tools
          for tracking eco-friendly habits with a vibrant network for sharing knowledge and
          fostering collaboration. Backed by experts in environmental science and community
          building, EcoHaven aims to empower the next generation to create a positive impact
          on the planet while nurturing their personal growth.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "60px", gap: "30px" }}>
        <div style={{ maxWidth: "250px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "green" }}>🌱 Eco Challenges</h3>
          <p>Take part in fun challenges to save energy, reduce waste, and live greener.</p>
        </div>
        <div style={{ maxWidth: "250px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "green" }}>👥 Community</h3>
          <p>Share ideas, inspire others, and connect with like-minded eco-warriors.</p>
        </div>
        <div style={{ maxWidth: "250px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "green" }}>📊 Progress</h3>
          <p>Track your impact, earn rewards, and grow your eco-journey with friends.</p>
        </div>
      </div>
    </div>

  );
};

export default Landing;

