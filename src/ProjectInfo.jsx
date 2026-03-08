import {
  Card,
  pageStyle,
  cardStyle,
  buttonStyle,
} from "./UI";

function ProjectInfo() {
  return (
    <div style={pageStyle}>
      <Card>
        <div style={cardStyle}>
          <h1>Project Info</h1>
          <p>This project is an interactive piano improvisation learning platform.</p>
          <p>
            Assuming the user already knows music theory, I built this website to help musicians learn how to improvise without fear and have lots of fun.
          </p>
          <p>
            My goal is to give aspiring musicians new skill sets such as improvising on the spot (which is a very impressive skill!)
          </p>

          {/* Back to Home Button */}
          <button
            style={buttonStyle}
            onClick={() => {
              window.location.href = '/'; // Navigate back to home
            }}
          >
            Back to Home
          </button>
        </div>
      </Card>
    </div>
  );
}

export default ProjectInfo;