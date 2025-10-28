import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ViewAudience from "./pages/ViewAudience.jsx";
 
function App() {
  return (
    <Router basename="/sathish-portfolio">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-audience" element={<ViewAudience />} />
      </Routes>
    </Router>
  );
}
 
export default App;