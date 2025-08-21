import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const Schedule = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className="bg-white rounded-lg my-5 p-5">
        <div className="flex justify-between items-center">
          <p className="font-bold">Match Schedule</p>
          <button
            className="bg-green-600 text-white px-3 py-1 font-bold text-xs cursor-pointer rounded-md"
            onClick={() => setShowModal(true)}
          >
            <span className="text-base mr-2">+</span>
            Add Match
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg my-5 p-5 text-sm">
        <div className="flex justify-between items-center border border-gray-200 rounded-md p-4">
          <div>
            <h2 className="font-bold text-gray-700">Team A VS Team B</h2>
            <p className="text-gray-500 text-xs">03-10-2025 at 15:00</p>
            <p className="text-gray-500 text-xs">Oyemekun Grammar School</p>
          </div>
          <div>
            <RiDeleteBin6Line className="text-red-500 text-lg" />
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 text-sm">
          <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg">
            <h2 className="font-bold text-lg mb-4">Schedule New Match</h2>
            <form>
              <div className="mb-3">
                <label className="block mb-1 text-sm">Home Team</label>
                <select
                  className="border px-2 py-1 w-full rounded outline-0"
                  name=""
                  id=""
                >
                  <option value="Team A">Team A</option>
                  <option value="Team B">Team B</option>
                  <option value="Team C">Team C</option>
                  <option value="Team D">Team D</option>
                  <option value="Team E">Team E</option>
                  <option value="Team F">Team F</option>
                  <option value="Team G">Team G</option>
                  <option value="Team H">Team H</option>
                  <option value="Team I">Team I</option>
                  <option value="Team J">Team J</option>
                  <option value="Team K">Team K</option>
                  <option value="Team L">Team L</option>
                  <option value="Team M">Team M</option>
                  <option value="Team N">Team N</option>
                  <option value="Team O">Team O</option>
                  <option value="Team P">Team P</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm">Away Team</label>
                <select
                  className="border px-2 py-1 w-full rounded outline-0"
                  name=""
                  id=""
                >
                  <option value="Team A">Team A</option>
                  <option value="Team B">Team B</option>
                  <option value="Team C">Team C</option>
                  <option value="Team D">Team D</option>
                  <option value="Team E">Team E</option>
                  <option value="Team F">Team F</option>
                  <option value="Team G">Team G</option>
                  <option value="Team H">Team H</option>
                  <option value="Team I">Team I</option>
                  <option value="Team J">Team J</option>
                  <option value="Team K">Team K</option>
                  <option value="Team L">Team L</option>
                  <option value="Team M">Team M</option>
                  <option value="Team N">Team N</option>
                  <option value="Team O">Team O</option>
                  <option value="Team P">Team P</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm">Date</label>
                <input
                  className="border px-2 py-1 w-full rounded outline-0"
                  type="date"
                  name=""
                  id=""
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm">Time</label>
                <input
                  className="border px-2 py-1 w-full rounded outline-0"
                  type="time"
                  name=""
                  id=""
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm">Venue</label>
                <input
                  className="border px-2 py-1 w-full rounded outline-0"
                  type="text"
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
      )}
    </div>
  );
};

export default Schedule;
