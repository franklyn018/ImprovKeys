import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, outerStyle } from "./UI";
import LessonTracker from "./LessonTracker";
import { getProgress } from "./getProgress";

function Lesson5() {
  const navigate = useNavigate();

  const [progress, setProgress] = useState({
    currentLesson: 1,
    completedLessons: [],
  });

  useEffect(() => {
    async function loadProgress() {
      try {
        const data = await getProgress();
        setProgress(data);
      } catch (err) {
        console.error("Failed to load progress:", err);
      }
    }

    loadProgress();
  }, []);

  const handleCompleteLesson = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to track lesson progress.");
        return;
      }

      const res = await fetch("http://localhost:5050/progress/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lessonNumber: 5 }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to update lesson progress.");
        return;
      }

      setProgress(data);
      navigate("/");
    } catch (err) {
      console.error("Lesson progress update error:", err);
      alert("Server error");
    }
  };

  return (
    <div style={outerStyle}>
      <Card>
        <LessonTracker
          currentPath="/lesson5"
          currentLesson={progress.currentLesson}
          completedLessons={progress.completedLessons}
        />

        <h1 style={{ marginBottom: "20px" }}>Lesson 5: Secret To A Good Melody</h1>

        <div style={{ margin: "20px 0" }}>
          <video
            width="100%"
            controls
            preload="auto"
            style={{ borderRadius: "10px" }}
          >
            <source src="lesson_videos/Lesson5.mp4" type="video/mp4" />
          </video>
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleCompleteLesson}
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
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Finish Course →
          </button>
        </div>
      </Card>
    </div>
  );
}

export default Lesson5;