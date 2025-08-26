import React, { useState } from "react";
import axios from "axios";

const initialTeam = {
  name: "",
  logo: "",
};

const TeamForm = ({ setShowModal, onTeamAdded }) => {
  const [team, setTeam] = useState(initialTeam);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let logoUrl = "";

      // 1️⃣ Upload logo if file is selected
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const uploadRes = await axios.post(
          "http://localhost:4000/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        logoUrl = uploadRes.data.imageurl;
      }

      // 2️⃣ Save team with logo url
      const newTeam = { name: team.name, logo: logoUrl };
      await axios.post("http://localhost:4000/addteam", newTeam);

      setTeam(initialTeam);
      setFile(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error adding team:", err.message);
    }
    onTeamAdded();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 text-sm">
      <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Team</h2>
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <label>Team Name</label>
            <input
              type="text"
              name="name"
              value={team.name}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>

          <div>
            <label>Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>

          <div className="flex justify-evenly gap-2 mt-7">
            <button
              type="button"
              className="bg-gray-300 w-32 py-2 rounded cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white w-32 py-2 rounded cursor-pointer"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamForm;
