import { Link } from "react-router-dom";
import { Card, outerStyle } from "./UI";

function Lesson3() {
  return (
    <div style={outerStyle}>
      
      <Card>
        <h1 style={{ marginBottom: '20px' }}>Lesson 3: More Suitable Notes</h1>

        <div style={{ margin: '20px 0' }}>
          <video 
            width="100%" 
            controls 
            preload="auto"
            style={{ borderRadius: '10px' }}
          >
            <source src="/Lesson3.mp4" type="video/mp4" />
          </video>
        </div>

        <Link to="/lesson4">
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
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            Go to Lesson 4 →
          </button>
        </Link>

      </Card>
    </div>
  );
}

export default Lesson3;