import React, { useEffect, useState } from "react";
import axios from "axios";
import TeamForm from "./TeamForm";

const Teams = () => {
  const [showModal, setShowModal] = useState(false);
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const res = await axios.get("http://localhost:4000/allteams");
      // Sort alphabetically by name
      const sortedTeams = (res.data.teams || []).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setTeams(sortedTeams);
    } catch (err) {
      console.error("Error fetching teams:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;

    try {
      await axios.delete(`http://localhost:4000/team/${id}`);
      // Remove and sort again
      setTeams((prev) =>
        prev
          .filter((team) => team._id !== id)
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    } catch (err) {
      console.error("Error deleting team:", err.message);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);
  return (
    <div>
      <div className="bg-white rounded-lg my-5 p-5">
        <div className="flex justify-between items-center">
          <p className="font-bold">Teams</p>
          <button
            className="bg-green-600 text-white px-3 py-1 font-bold text-xs cursor-pointer rounded-md"
            onClick={() => setShowModal(true)}
          >
            <span className="text-base mr-2">+</span>
            Add Team
          </button>
        </div>
      </div>
      <div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team._id}
                className="bg-white rounded-lg p-5 shadow-md flex flex-col items-center"
              >
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-24 h-24 object-contain mb-2"
                />
                <p className="font-medium text-center">{team.name}</p>
                <button
                  onClick={() => handleDelete(team._id)}
                  className="mt-2 bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <TeamForm setShowModal={setShowModal} onTeamAdded={fetchTeams} />
      )}
    </div>
  );
};

export default Teams;
