import axios from "axios";
import React, { useEffect, useState } from "react";

const initialPerson = {
  role: "",
  name: "",
  nationality: "",
  position: "",
  jerseyNumber: "",
  age: "",
  team: "",
  coachingRole: "",
  experience: "",
  contact: "",
  image: "",
};

const PersonForm = ({ onSubmit, setShowModal }) => {
  const [person, setPerson] = useState(initialPerson);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/allteams").then((res) => {
      const sortedTeams = (res.data.teams || []).sort((a, b) => {
        a.name.localeCompare(b.name);
      });
      setTeams(sortedTeams);
    });
  }, []);

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      // 1️⃣ Upload image if file is selected
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const uploadRes = await axios.post(
          "http://localhost:4000/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        imageUrl = uploadRes.data.imageurl;
        setImageUrl(imageUrl); // <-- set for preview
      }
      const newPerson = { ...person, image: imageUrl };
      await axios.post("http://localhost:4000/person", newPerson);
      alert("Person added successfully!");
      setPerson(initialPerson);
      setShowModal(false);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 text-sm">
      <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add a new person</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-5 rounded-lg"
        >
          <div>
            <label>Role</label>
            <select
              name="role"
              value={person.role}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            >
              <option value="">Select Role</option>
              <option value="player">Player</option>
              <option value="coach">Coach</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={person.name}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Nationality</label>
            <input
              type="text"
              name="nationality"
              value={person.nationality}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Team</label>
            <select name="team" id="team" value={person.team} onChange={handleChange} required className="border px-2 py-1 rounded w-full">
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
            {/* <input
              type="text"
              name="team"
              value={person.team}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            /> */}
          </div>
          {person.role === "player" && (
            <>
              <div>
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  value={person.position}
                  onChange={handleChange}
                  required
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div>
                <label>Jersey Number</label>
                <input
                  type="number"
                  name="jerseyNumber"
                  value={person.jerseyNumber}
                  onChange={handleChange}
                  required
                  className="border px-2 py-1 rounded w-full"
                />
              </div>

              <div>
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={person.age}
                  onChange={handleChange}
                  required
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
            </>
          )}
          {person.role === "coach" && (
            <>
              <div>
                <label>Coaching Role</label>
                <input
                  type="text"
                  name="coachingRole"
                  value={person.coachingRole}
                  onChange={handleChange}
                  required
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              {/* <div>
                <label>Experience (years)</label>
                <input
                  type="number"
                  name="experience"
                  value={person.experience}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
               */}
            </>
          )}
          {/* {person.role === "manager" && (
            <>
              <div>
                <label>Club</label>
                <input
                  type="text"
                  name="club"
                  value={person.club}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div>
                <label>Experience (years)</label>
                <input
                  type="number"
                  name="experience"
                  value={person.experience}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
            </>
          )} */}

          <div>
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={person.contact}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              name="image"
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
              Add Person
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonForm;
