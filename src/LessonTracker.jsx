import { Link } from "react-router-dom";

const steps = [
  { path: "/lesson1", lessonNumber: 1 },
  { path: "/lesson2", lessonNumber: 2 },
  { path: "/lesson3", lessonNumber: 3 },
  { path: "/lesson4", lessonNumber: 4 },
  { path: "/lesson5", lessonNumber: 5 },
];

function LessonTracker({ currentLesson = 1 }) {
  const progressIndex = Math.max(0, Math.min(currentLesson - 1, steps.length - 1));

  const filledPercent =
    steps.length > 1 ? (progressIndex / (steps.length - 1)) * 100 : 0;

  // fine-tune bubble alignment per lesson
  const bubbleOffsetMap = {
    1: 17,
    2: 9,
    3: -0.5,
    4: -9,
    5: -17,
  };

  const bubbleOffset = bubbleOffsetMap[currentLesson] ?? 0;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "780px",
        margin: "0 auto 22px auto",
        paddingTop: "22px",
        transform: "translateY(-50px)",
      }}
    >
      {/* bubble */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "44px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${filledPercent}%`,
            top: 0,
            transform: `translateX(calc(-50% + ${bubbleOffset}px))`,
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#10b981",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              padding: "8px 14px",
              borderRadius: "12px",
              lineHeight: 1,
              minWidth: "44px",
              textAlign: "center",
            }}
          >
            {currentLesson}
          </div>

          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "9px solid transparent",
              borderRight: "9px solid transparent",
              borderTop: "10px solid #10b981",
            }}
          />
        </div>
      </div>

      {/* tracker row */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "34px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* gray line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            height: "8px",
            backgroundColor: "#d9d9d9",
            borderRadius: "999px",
            zIndex: 1,
          }}
        />

        {/* green filled line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${filledPercent}%`,
            top: "50%",
            transform: "translateY(-50%)",
            height: "8px",
            backgroundColor: "#10b981",
            borderRadius: "999px",
            zIndex: 2,
            transition: "width 0.3s ease",
          }}
        />

        {/* dots */}
        {steps.map((step, index) => {
          const filled = index <= progressIndex;

          const dot = (
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                backgroundColor: filled ? "#10b981" : "#d9d9d9",
                zIndex: 3,
                position: "relative",
                flexShrink: 0,
              }}
            />
          );

          return (
            <Link
              key={step.path}
              to={step.path}
              style={{
                textDecoration: "none",
                zIndex: 3,
              }}
            >
              {dot}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LessonTracker;