import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5050/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      console.log("Login success:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email); // ✅ save email

      onLoginSuccess && onLoginSuccess(email);

      navigate("/");
    } catch (err) {
      console.error("Fetch failed:", err);
      setError("Cannot connect to server — make sure backend is running");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ marginBottom: "20px" }}>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.loginButton} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Don&apos;t have an account?{" "}
          <Link to="/register" style={{ color: "#3b82f6" }}>
            Register
          </Link>
        </p>

        <button onClick={() => navigate("/")} style={styles.backButton}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #7c3aed33 0%, #020617 100%)",
    zIndex: 9999,
  },
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    padding: "40px",
    borderRadius: "20px",
    color: "white",
    minWidth: "320px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "none",
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#7c3aed",
    color: "white",
  },
  backButton: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#6b7280",
    color: "white",
  },
  error: {
    color: "#f87171",
  },
};
