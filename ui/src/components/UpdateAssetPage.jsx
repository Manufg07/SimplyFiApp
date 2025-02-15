import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UpdateAssetPage = () => {
  const { id } = useParams();
  const [newValue, setNewValue] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/assets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newValue }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Asset updated successfully!");
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="bg-blue-100 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Update Asset
        </h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              New Value
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Update Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAssetPage;
