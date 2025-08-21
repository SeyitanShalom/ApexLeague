import React, { useState } from "react";

const TeamLineups = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="bg-white rounded-lg my-5 p-5">
        <div className="flex justify-between items-center">
          <p className="font-bold">Team Lineup</p>
          <button
            className="bg-green-600 text-white px-3 py-1 font-bold text-xs cursor-pointer rounded-md"
            onClick={() => setShowModal(true)}
          >
            <span className="text-base mr-2">+</span>Add Player
          </button>
        </div>
        <div className="flex items-center gap-10 my-5">
          <div className="flex flex-col text-sm">
            <label htmlFor="team">Team</label>
            <select
              className="border-2 border-gray-300 rounded-md cursor-pointer px-3"
              name="team"
              id="team"
            >
              <option value="Team A">Team A</option>
              <option value="Team B">Team B</option>
              <option value="Team C">Team C</option>
              <option value="Team D">Team D</option>
            </select>
          </div>
          <div className="flex flex-col text-sm">
            <label htmlFor="formation">Formation</label>
            <select
              className="border-2 border-gray-300 rounded-md cursor-pointer px-3"
              name="formation"
              id="formation"
            >
              <option value="4-4-2">4-4-2</option>
              <option value="4-3-3">4-3-3</option>
              <option value="4-2-3-1">4-2-3-1</option>
              <option value="3-5-2">3-5-2</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg my-5 p-5 text-sm">
        <div>
          <p>Starting XI</p>
          <div>
            <div className="bg-green-50 rounded-md px-5 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-green-600 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold">
                  5
                </div>
                <div className="flex flex-col -space-y-1 ">
                  <h2 className="font-bold text-gray-800">Seyitan Shalom</h2>
                  <p className="text-gray-500">GK</p>
                </div>
              </div>
              <button className="bg-red-100 px-3 py-1 text-red-700 font-medium text-xs rounded-sm">
                Bench
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p>Substitutes</p>
          <div>
            <div className="bg-gray-50 rounded-md px-5 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-gray-600 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold">
                  5
                </div>
                <div className="flex flex-col -space-y-1 ">
                  <h2 className="font-bold text-gray-800">Seyitan Shalom</h2>
                  <p className="text-gray-500">GK</p>
                </div>
              </div>
              <button className="bg-green-100 px-3 py-1 text-green-700 font-medium text-xs rounded-sm">
                Start
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 text-sm">
          <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg">
            <h2 className="font-bold text-lg mb-4">Add New Player</h2>
            <form>
              <div className="mb-3">
                <label className="block mb-1 text-sm">Player Name</label>
                <input
                  className="border px-2 py-1 w-full rounded outline-0"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm">Position</label>
                <select className="border px-2 py-1 w-full rounded outline-0 cursor-pointer">
                 <option value="Goalkeeper">Goalkeeper</option>
                 <option value="Defender">Defender</option>
                 <option value="Midfielder">Midfielder</option>
                 <option value="Forward">Forward</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm">Jersey Number</label>
                <input
                  className="border px-2 py-1 w-full rounded outline-0"
                  type="number"
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

export default TeamLineups;
