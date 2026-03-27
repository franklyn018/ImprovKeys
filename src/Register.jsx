import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register({ setIsLoggedIn, setUserEmail }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("http://localhost:5050/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Registration failed");
        return;
      }

      alert("Registered successfully!");

      localStorage.setItem("token", data.token || "");

      if (setIsLoggedIn) {
        setIsLoggedIn(true);
      }

      if (setUserEmail) {
        setUserEmail(email);
      }

      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
      alert("Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "radial-gradient(circle at top, #7c3aed33 0%, #020617 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          minWidth: "300px",
          maxWidth: "400px",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Register</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleRegister}
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: isSubmitting ? "#60a5fa" : "#3b82f6",
            color: "white",
            fontSize: "16px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#7c3aed" }}>
            Login
          </Link>
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#6b7280",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}