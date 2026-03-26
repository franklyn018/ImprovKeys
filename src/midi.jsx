import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Midi() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastNote, setLastNote] = useState("");
  const [status, setStatus] = useState("Click Connect MIDI to begin.");

  const midiAccessRef = useRef(null);

  const noteFiles = {
    60: "/sounds/C4.mp3",
    61: "/sounds/Cs4.mp3",
    62: "/sounds/D4.mp3",
    63: "/sounds/Ds4.mp3",
    64: "/sounds/E4.mp3",
    65: "/sounds/F4.mp3",
    66: "/sounds/Fs4.mp3",
    67: "/sounds/G4.mp3",
    68: "/sounds/Gs4.mp3",
    69: "/sounds/A4.mp3",
    70: "/sounds/As4.mp3",
    71: "/sounds/B4.mp3",
    72: "/sounds/C5.mp3",
  };

  function midiToNoteName(noteNumber) {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const note = notes[noteNumber % 12];
    const octave = Math.floor(noteNumber / 12) - 1;
    return `${note}${octave}`;
  }

  function playNote(noteNumber) {
    const filePath = noteFiles[noteNumber];
    if (!filePath) return;

    const audio = new Audio(filePath);
    audio.currentTime = 0;
    audio.play().catch((err) => {
      console.error("Audio could not play:", err);
    });
  }

  function handleMidiMessage(event) {
    const [statusByte, note, velocity] = event.data;
    const command = statusByte & 0xf0;

    if (command === 0x90 && velocity > 0) {
      const noteName = midiToNoteName(note);
      setLastNote(noteName);
      setStatus(`Played: ${noteName} (MIDI ${note})`);
      playNote(note);
    }

    if (command === 0x80 || (command === 0x90 && velocity === 0)) {
      // note off logic can go here later
    }
  }

  async function connectMidi() {
    try {
      if (!navigator.requestMIDIAccess) {
        setStatus("Web MIDI is not supported in this browser.");
        return;
      }

      const midiAccess = await navigator.requestMIDIAccess();
      midiAccessRef.current = midiAccess;

      let foundInput = false;

      for (const input of midiAccess.inputs.values()) {
        input.onmidimessage = handleMidiMessage;
        foundInput = true;
        console.log("Connected MIDI input:", input.name);
      }

      midiAccess.onstatechange = () => {
        for (const input of midiAccess.inputs.values()) {
          input.onmidimessage = handleMidiMessage;
        }
      };

      if (foundInput) {
        setIsConnected(true);
        setStatus("MIDI connected. Press a key on your controller.");
      } else {
        setStatus("No MIDI input device found. Plug in your controller and try again.");
      }
    } catch (error) {
      console.error("MIDI connection failed:", error);
      setStatus("Failed to connect to MIDI device.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",                 // 🔥 ensures full width
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        background: "linear-gradient(135deg, #0f172a, #1e3a8a, #7c3aed)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
          color: "white",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <h1
          style={{
            fontSize: "2.4rem",
            marginBottom: "10px",
            fontWeight: "800",
          }}
        >
          MIDI Keyboard Test
        </h1>

        <p
          style={{
            fontSize: "1.05rem",
            marginBottom: "30px",
            color: "rgba(255,255,255,0.9)",
            lineHeight: "1.6",
          }}
        >
          Connect your MIDI keyboard and press a key to test whether your controller
          is being detected and whether the note audio is playing correctly.
        </p>

        <button
          onClick={connectMidi}
          style={{
            padding: "16px 34px",
            fontSize: "18px",
            fontWeight: "700",
            border: "none",
            borderRadius: "999px",
            cursor: "pointer",
            background: "linear-gradient(135deg, #10b981, #3b82f6)",
            color: "white",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            marginBottom: "25px",
          }}
        >
          {isConnected ? "Reconnect MIDI" : "Connect MIDI"}
        </button>

        <div
          style={{
            marginBottom: "20px",
            padding: "18px 20px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            fontSize: "1rem",
            fontWeight: "600",
            lineHeight: "1.5",
          }}
        >
          {status}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div
              style={{
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.75)",
                marginBottom: "8px",
              }}
            >
              Connection
            </div>
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: "800",
                color: isConnected ? "#86efac" : "#fca5a5",
              }}
            >
              {isConnected ? "Connected" : "Not Connected"}
            </div>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div
              style={{
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.75)",
                marginBottom: "8px",
              }}
            >
              Last Note
            </div>
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: "800",
              }}
            >
              {lastNote || "None yet"}
            </div>
          </div>
        </div>

        <div
          style={{
            marginBottom: "28px",
            padding: "18px",
            borderRadius: "16px",
            background: "rgba(15, 23, 42, 0.45)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div
            style={{
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.75)",
              marginBottom: "10px",
            }}
          >
            Supported Test Range
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5"].map((note) => (
              <span
                key={note}
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.1)",
                  fontSize: "0.92rem",
                  fontWeight: "700",
                }}
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <Link to="/practice">
          <button
            style={{
              padding: "14px 28px",
              fontSize: "17px",
              fontWeight: "700",
              border: "none",
              borderRadius: "999px",
              cursor: "pointer",
              background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
              color: "white",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            ← Back to Practice Lab
          </button>
        </Link>
      </div>
    </div>
  );
}