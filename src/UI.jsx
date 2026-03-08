import { motion } from "framer-motion";

export const Card = ({ children }) => ( // this is for the lesson pages
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    style={{
      width: '100%',
      maxWidth: '700px',
      textAlign: 'center',
    }}
  >
    {children}
  </motion.div>
);

export const pageStyle = { // for AboutMe, ProjectInfo, PracticeLab
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  fontFamily: "sans-serif",
  background: "radial-gradient(circle at top, #7c3aed33 0%, #020617 100%)",
  color: "white"
};

export const cardStyle = { // for AboutMe, ProjectInfo, PracticeLab
  background: "rgba(15, 23, 42, 0.85)",
  padding: "40px",
  borderRadius: "20px",
  maxWidth: "600px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  textAlign: "center"
};

export const buttonStyle = { // for AboutMe, ProjectInfo, PracticeLab
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#7c3aed',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

export const noteButtonStyle = { // styling for the note buttons
  width: '80px',
  height: '150px',
  backgroundColor: 'white',
  border: '2px solid #333',
  borderRadius: '0 0 5px 5px',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#000',
  cursor: 'pointer',
  boxShadow: '0 4px #999',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  paddingBottom: '20px',
  transition: '0.1s'
};

export const outerStyle = { 
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  fontFamily: "sans-serif",
};

export const glowStyle = { // for practice lab / demo
  boxShadow: "0 0 20px #7c3aed, 0 0 40px #7c3aed",
  transform: "scale(1.1)",
};

export const playButtonStyle = { // for practice lab / demo
  padding: "15px 30px",
  margin: "10px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export const pauseButtonStyle = { // for practice lab / demo
  padding: "15px 30px",
  margin: "10px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export const recordButtonStyle = {
  padding: "15px 30px",
  margin: "10px",
  backgroundColor: "#f97316",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};