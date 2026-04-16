import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './our/components/navbar/Navbar';
import BottomNavbar from './our/components/navbar/BottomNavbar';
import Team from './our/views/Team';
import Main from './our/views/Main';
import Events from './our/views/Events';
import EventDetail from './our/views/EventDetail';
import FoundersPit from './our/views/FoundersPit';
import About from './our/views/About';
import Live from './our/views/Live';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 md:w-[80%] w-full p-4">
        <Navbar />
      </div>
      <div className="pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/live" element={<Live />} />
          <Route path="/founders-pit" element={<FoundersPit />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <BottomNavbar />
    </Router>
  );
}

export default App;

