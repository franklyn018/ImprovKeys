import {
  Card,
  pageStyle,
  cardStyle,
  buttonStyle,
} from "./UI";

function AboutMe() {
  return (
    <div style={pageStyle}>
      <Card>
        <div style={cardStyle}>
          <h1>About Me</h1>
          <p>
            Hi, I’m <strong>Franklyn Lu</strong>, a piano player and creator of this Piano Improvisation project.
          </p>
          <p>
            I have been experimenting with new ideas with piano improvisation since I was in middle school. Many of my musical peers only know how to read from sheet music. I envision a future for people to learn about other skill sets in music such as making up your own song on the spot. 
          </p>

          {/* Back to Home Button */}
          <button
            style={buttonStyle}
            onClick={() => {
              window.location.href = '/'; // Navigate to home page
            }}
          >
            Back to Home
          </button>
        </div>
      </Card>
    </div>
  );
}

export default AboutMe;