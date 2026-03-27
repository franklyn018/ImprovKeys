import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, outerStyle } from "./UI";
import { glowStyle, noteButtonStyle, playButtonStyle, pauseButtonStyle } from "./UI";

function Demo1() {
  const backingTrackRef = useRef(null);
  const [activeNote, setActiveNote] = useState(null);

  const playNote = (noteFile, noteName) => {
    const audio = new Audio(`/${noteFile}`);
    audio.play();

    setActiveNote(noteName);
    setTimeout(() => setActiveNote(null), 150);
  };

  return (
    <div style={outerStyle}>
      <Card>
        <h1 style={{ marginBottom: "20px" }}>Interactive Jam Session</h1>

        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          Click the play button to start the backing track. <br />
          While it's playing, tap the 3 buttons and make up a melody!
        </p>

        <div style={{ marginBottom: "30px" }}>
          <audio ref={backingTrackRef} src="jam_session/backing1.mp3" loop />

          <button
            onClick={() => backingTrackRef.current.play()}
            style={playButtonStyle}
          >
            ▶ Play Backing Track
          </button>

          <button
            onClick={() => backingTrackRef.current.pause()}
            style={pauseButtonStyle}
          >
            ⏸ Pause
          </button>
        </div>

        {/* Glowing Note Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          {["C", "E", "G"].map((note) => (
            <button
              key={note}
              onClick={() => playNote(`jam_session/${note.toLowerCase()}-note.mp3`, note)}
              style={{
                ...noteButtonStyle,
                ...(activeNote === note ? glowStyle : {})
              }}
            >
              {note}
            </button>
          ))}
        </div>

        {/* Fancy Gradient Button to Lesson 3 */}
        <Link to="/lesson3">
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
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              marginTop: "20px",
              display: "inline-block"
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            Go to Lesson 3 →
          </button>
        </Link>

        {/* 🔥 Added Back to Home Button */}
        <div style={{ marginTop: "15px" }}>
          <Link to="/">
            <button
              style={{
                padding: "18px 40px",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "50px",
                border: "none",
                background: "linear-gradient(135deg, #6b7280, #374151)",
                color: "white",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              }}
              onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.target.style.transform = "scale(1)"}
            >
              ← Back to Home
            </button>
          </Link>
        </div>

      </Card>
    </div>
  );
}

export default Demo1;