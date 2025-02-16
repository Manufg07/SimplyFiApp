import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateAssetPage = () => {
  const [assetID, setAssetID] = useState("");
  const [owner, setOwner] = useState("");
  const [value, setValue] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    const newAsset = {
      assetID,
      owner,
      value: value.toString(),
    };

    try {
      const res = await fetch("/api/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAsset),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Asset created successfully!");
        setAssetID("");
        setOwner("");
        setValue("");
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
          Create Asset
        </h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Asset ID
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={assetID}
              onChange={(e) => setAssetID(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Owner</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Value</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Create Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssetPage;
