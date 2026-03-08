import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  pageStyle,
  cardStyle,
  buttonStyle,
  noteButtonStyle,
  outerStyle,
  glowStyle,
  playButtonStyle,
  pauseButtonStyle,
  recordButtonStyle
} from "./UI";

function PracticeLab() {
  const backingTrackRef = useRef(null);

  const audioContextRef = useRef(null);
  const destinationRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [selectedTrack, setSelectedTrack] = useState("backing1.mp3");
  const [volume, setVolume] = useState(0.7);
  const [activeNote, setActiveNote] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedURL, setRecordedURL] = useState(null);

  const chordProgressions = {
    "backing1.mp3": ["C", "C", "Am", "Am"],
    "backing2.mp3": ["C", "F", "Am", "G"],
    "backing3.mp3": ["Am", "G", "Em", "F"],
    "backing4.mp3": ["C", "Dm", "F", "G"],
    "backing5.mp3": ["Dm", "Em", "F", "G"],
  };

  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      destinationRef.current =
        audioContextRef.current.createMediaStreamDestination();
    }
  };

  const playNote = (noteFile, noteName) => {
    initAudio();

    const audio = new Audio(`/${noteFile}`);
    audio.volume = volume;

    const track = audioContextRef.current.createMediaElementSource(audio);
    track.connect(destinationRef.current);
    track.connect(audioContextRef.current.destination);

    audio.play();

    setActiveNote(noteName);
    setTimeout(() => setActiveNote(null), 150);
  };

  const changeTrack = (e) => {
    const newTrack = e.target.value;
    setSelectedTrack(newTrack);

    backingTrackRef.current.pause();
    backingTrackRef.current.load();
  };

  const startRecording = () => {
    initAudio();
    chunksRef.current = [];

    const mediaRecorder = new MediaRecorder(destinationRef.current.stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setRecordedURL(url);
    };

    mediaRecorder.start();
    setIsRecording(true);

    // Recording always starts backing track
    backingTrackRef.current.play();
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    backingTrackRef.current.pause();
    setIsRecording(false);
  };

  return (
    <div style={outerStyle}>
      <Card>
        <h1 style={{ marginBottom: "20px" }}>Welcome to the Practice Lab</h1>

        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          Choose a backing track, press play to practice, or press record to save your performance!
        </p>

        {/* Track Selector */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Choose a backing track: </label>
          <select
            onChange={changeTrack}
            value={selectedTrack}
            style={{ padding: "8px", marginLeft: "10px" }}
          >
            <option value="backing1.mp3">Backing Track 1</option>
            <option value="backing2.mp3">Backing Track 2</option>
            <option value="backing3.mp3">Backing Track 3</option>
            <option value="backing4.mp3">Backing Track 4</option>
            <option value="backing5.mp3">Backing Track 5</option>
          </select>
        </div>

        {/* Volume */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold" }}>Volume: </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={{ width: "200px", marginLeft: "10px" }}
          />
        </div>

        {/* Backing Track */}
        <audio
          ref={backingTrackRef}
          src={`/${selectedTrack}`}
          loop
          onPlay={() => {
            initAudio();
            const track = audioContextRef.current.createMediaElementSource(
              backingTrackRef.current
            );
            track.connect(destinationRef.current);
            track.connect(audioContextRef.current.destination);
          }}
        />

        {/* Controls */}
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => backingTrackRef.current.play()}
            style={playButtonStyle}
          >
            ▶ Play
          </button>

          <button
            onClick={() => backingTrackRef.current.pause()}
            style={pauseButtonStyle}
          >
            ⏸ Pause
          </button>

          <button
            onClick={startRecording}
            disabled={isRecording}
            style={recordButtonStyle}
          >
            🔴 Record
          </button>

          <button
            onClick={stopRecording}
            disabled={!isRecording}
            style={pauseButtonStyle}
          >
            ⏹ Stop Recording
          </button>
        </div>

        {/* Chord Progression */}
        <div
          style={{
            marginBottom: "25px",
            padding: "10px 20px",
            backgroundColor: "#111827",
            color: "#fff",
            borderRadius: "10px",
            display: "inline-block",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Chord Progression: {chordProgressions[selectedTrack].join(" → ")}
        </div>

        {/* Piano Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          {["C", "D", "E", "F", "G", "A", "B"].map((note) => (
            <button
              key={note}
              onClick={() =>
                playNote(`${note.toLowerCase()}-note.mp3`, note)
              }
              style={{
                ...noteButtonStyle,
                ...(activeNote === note ? glowStyle : {}),
              }}
            >
              {note}
            </button>
          ))}
        </div>

        {/* Playback Recording */}
        {recordedURL && (
          <div style={{ marginTop: "20px" }}>
            <h3>Your Recording:</h3>
            <audio controls src={recordedURL} />
            <br />
            <a href={recordedURL} download="my-improvisation.webm">
              <button style={buttonStyle}>Download Recording</button>
            </a>
          </div>
        )}

        <Link to="/">
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
              marginTop: "20px",
            }}
          >
            Go to Home →
          </button>
        </Link>
      </Card>
    </div>
  );
}

export default PracticeLab;