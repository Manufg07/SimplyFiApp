import React, { useState } from "react";
import { toast } from "react-toastify";

const ReadAssetPage = () => {
  const [assetID, setAssetID] = useState("");
  const [assetData, setAssetData] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/assets/${assetID}`, {
        method: "GET",
      });

      const result = await res.json();

      if (result.success) {
        setAssetData(result.data);
        toast.success("Asset fetched successfully!");
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
          Read Asset User using AssetID
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
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Read Asset
          </button>
        </form>

        {assetData && (
          <div className="mt-6 bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Asset Details
            </h3>
            <pre className="text-gray-700">
              {JSON.stringify(assetData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadAssetPage;
