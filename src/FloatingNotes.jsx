function FloatingNotes() {
  const notes = ["🎵", "🎶", "🎼", "🎹", "♩", "♪"];

  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      zIndex: 0
    }}>
      {Array.from({ length: 50 }).map((_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            fontSize: `${Math.random() * 20 + 20}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,   // 🔥 THIS fixes the top-only problem
            animation: `floatUp ${10 + Math.random() * 15}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.15,
            color: "white"
          }}
        >
          {notes[Math.floor(Math.random() * notes.length)]}
        </span>
      ))}
    </div>
  );
}

export default FloatingNotes;