import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";
import Lesson1 from './Lesson1';
import Lesson2 from './Lesson2';
import Lesson3 from './Lesson3';
import Lesson4 from './Lesson4';
import Lesson5 from './Lesson5';
import Demo1 from './Demo1';
import AboutMe from './AboutMe';
import ProjectInfo from './ProjectInfo';
import PracticeLab from './PracticeLab';
import Home from './Home';
import Midi from './midi';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home 
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          setIsLoggedIn={setIsLoggedIn}
          setUserEmail={setUserEmail}
        />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/project" element={<ProjectInfo />} />
        <Route path="/practice" element={<PracticeLab />} />
        <Route path="/midi" element={<Midi />} /> 
        <Route path="/lesson1" element={<Lesson1 />} />
        <Route path="/lesson2" element={<Lesson2 />} />
        <Route path="/demo1" element={<Demo1 />} />
        <Route path="/lesson3" element={<Lesson3 />} />
        <Route path="/lesson4" element={<Lesson4 />} />
        <Route path="/lesson5" element={<Lesson5 />} />
        <Route path="/login" element={<Login 
          onLoginSuccess={(email) => {
          setIsLoggedIn(true);
          setUserEmail(email);
          }}
        />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} />} />
        <Route path="/private" element={<PrivateRoute />} />
      </Routes>
    </Router>
  );
}

export default App;

// front end: npm run dev
// back end: node my-piano-app/backend/server.js
// http://localhost:5173/