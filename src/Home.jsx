import { Link } from "react-router-dom";

import Navbar from "./NavBar";
import FloatingNotes from "./FloatingNotes";
import { buttonStyle } from "./UI";

function Home({ isLoggedIn, userEmail, setIsLoggedIn, setUserEmail }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        background: "radial-gradient(circle at top, #7c3aed33 0%, #020617 100%)",
        color: "white",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        textAlign: "center",
      }}
    >
      <FloatingNotes />

      {/* Top-right Login/Register or Welcome */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          display: "flex",
          gap: "10px",
          zIndex: 1000,
          alignItems: "center",
        }}
      >
      {!isLoggedIn ? (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            display: "flex",
            gap: "10px",
            zIndex: 1000,
            alignItems: "center",
          }}
        >
          <Link to="/login">
            <button style={buttonStyle}>Login</button>
          </Link>

          <Link to="/register">
            <button style={{ ...buttonStyle, backgroundColor: "#3b82f6" }}>
              Register
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              zIndex: 1000,
              fontWeight: "bold",
            }}
          >
            Welcome, {userEmail}
          </div>

          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 1000,
            }}
          >
            <button
              onClick={handleLogout}
              style={{ ...buttonStyle, backgroundColor: "#7c3aed" }}
            >
              Logout
            </button>
          </div>
        </>
      )}
      </div>

      <Navbar />

      {/* Glass Card */}
      <div
        style={{
          padding: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
          zIndex: 1,
          maxWidth: "600px",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
          ImprovKey <br />
          <span style={{ fontWeight: "300" }}>Piano Improvisation</span>
        </h1>

        <h3
          style={{
            textTransform: "uppercase",
            letterSpacing: "4px",
            color: "#cbd5e0",
            fontSize: "0.9rem",
            marginBottom: "30px",
          }}
        >
          Made by Franklyn Lu
        </h3>

        <p style={{ fontSize: "1.2rem", marginBottom: "30px", opacity: 0.9 }}>
          Unleash your creativity. Play what you feel.
        </p>

        <Link to="/lesson1">
          <button
            style={{
              padding: "18px 40px",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "50px",
              border: "none",
              background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
              color: "white",
            }}
          >
            Start Improvising Lessons
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;