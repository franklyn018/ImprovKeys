// helper function for LessonTracker.jsx

export async function getProgress() {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      currentLesson: 1,
      completedLessons: [],
    };
  }

  const res = await fetch("http://localhost:5050/progress", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch progress");
  }

  return data;
}