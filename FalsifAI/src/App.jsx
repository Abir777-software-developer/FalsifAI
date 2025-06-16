import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import News from "./pages/News";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/verify" element={<Verify />} />
          <Route exact path="/news" element={<News />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
