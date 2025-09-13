import React, { useState } from "react";
import PersonForm from "./PersonForm";

const Players = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className="bg-white rounded-lg my-5 p-5">
        <div className="flex justify-between items-center">
          <p className="font-bold">Players/Coaches/Managers</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-3 py-1 font-bold text-xs cursor-pointer rounded-md"
          >
            <span className="text-base mr-2">+</span>Add Players
          </button>
        </div>
      </div>
      {showModal && <PersonForm setShowModal={setShowModal} />}
    </div>
  );
};

export default Players;
