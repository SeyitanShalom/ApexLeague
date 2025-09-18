import React, { useEffect, useState } from "react";
import PersonForm from "./PersonForm";
import axios from "axios";
import Flags from "country-flag-icons/react/3x2";

const People = () => {
  const [showModal, setShowModal] = useState(false);
  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    try {
      const res = await axios.get("http://localhost:4000/people");
      setPeople(res.data.people);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handlePersonAdded = () => {
    setShowModal(false);
    fetchPeople();
  };
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
      <div className="bg-white rounded-lg my-5 p-5">
        <h2 className="font-bold mb-2">Players</h2>
        <div className="grid grid-cols-">
          {people
            .filter((p) => p.role === "player")
            .map((person) => (
              <div key={person._id} className="mb-2 flex items-center gap-3 text-sm">
                <div className="flex items-center w-20">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="rounded-sm
                  "
                  />
                </div>
                <div>
                  <p className="flex items-center gap-x-1 font-bold text-base">
                    {person.name} {""}
                    {person.nationality === "Nigerian" ||
                    person.nationality === "nigerian" ? (
                      <Flags.NG
                        title="Nigeria"
                        style={{ width: "20px", height: "20px" }}
                      />
                    ) : (
                      person.nationality
                    )}
          
                  </p>
                  <p><span className="font-semibold">Team: </span>{person.team}</p>
                  <p><span className="font-semibold">Age: </span>{person.age}</p>
                  <p><span className="font-semibold">Position: </span>{person.position}</p>
                  <p><span className="font-semibold">Contact: </span>{person.contact}</p>
                </div>
              </div>
            ))}
        </div>

        <h2 className="font-bold mt-6 mb-2">Coaches</h2>
        {people
          .filter((p) => p.role === "coach")
          .map((person) => (
            <div key={person._id} className="mb-2 flex items-center">
              <div className="flex items-center w-20">
                <img src={person.image} alt={person.name} />
              </div>
              <p>{person.name}</p>
            </div>
          ))}

        <h2 className="font-bold mt-6 mb-2">Managers</h2>
        {people
          .filter((p) => p.role === "manager")
          .map((person) => (
            <div key={person._id} className="mb-2 flex items-center">
              <div className="flex items-center w-20">
                <img src={person.image} alt={person.name} />
              </div>
              <p>{person.name}</p>
            </div>
          ))}
      </div>
      {showModal && (
        <PersonForm setShowModal={setShowModal} onSubmit={handlePersonAdded} />
      )}
    </div>
  );
};

export default People;
