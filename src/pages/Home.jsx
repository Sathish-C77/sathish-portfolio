import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal.jsx";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="main-page">
  
      <button className="save-segment-btn" onClick={() => setIsModalOpen(true)}>
        Save segment
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Home;