import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UpdateAssetPage = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState({ assetID: "", owner: "", value: "" });
  const [newValue, setNewValue] = useState("");
  const [newOwner, setNewOwner] = useState("");

  // Fetch asset details when the component mounts
  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await fetch(`/api/assets/${id}`);
        const result = await res.json();

        if (result.success) {
          setAsset(result.data);
          setNewValue(result.data.value);
          setNewOwner(result.data.owner);
        } else {
          toast.error(`Error: ${result.error}`);
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    };

    fetchAsset();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/assets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newValue, newOwner }),
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
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Update Asset
        </h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Asset ID
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={asset.assetID}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              New Owner
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              New Value
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 w-full"
          >
            Update Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAssetPage;
