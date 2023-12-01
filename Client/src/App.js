import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Join from "./pages/join";
import Chat from "./pages/chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
