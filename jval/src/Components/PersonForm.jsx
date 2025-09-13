import React, { useState } from "react";

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

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(person);
    setPerson(initialPerson);
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
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Team</label>
            <input
              type="text"
              name="team"
              value={person.team}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
            />
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
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={person.image}
              onChange={handleChange}
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
