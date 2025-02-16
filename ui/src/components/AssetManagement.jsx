import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AssetManagement = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const navigate = useNavigate();

  // Fetch all assets on component mount
  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await fetch("/api/assets");
      const result = await res.json();

      if (result.success) {
        setAssets(result.data);
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // Update Asset Handlers
  const handleUpdateClick = (asset) => {
    setSelectedAsset(asset);
    setNewValue(asset.value);
    setNewOwner(asset.owner);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/assets/${selectedAsset.assetID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newValue, newOwner }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Asset updated successfully!");
        fetchAssets();
        setShowUpdateModal(false);
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // Delete Asset Handlers
  const handleDeleteClick = (asset) => {
    setSelectedAsset(asset);
    setShowDeleteModal(true);
  };

const handleDeleteConfirm = async () => {
  if (!selectedAsset || !selectedAsset.assetID) {
    toast.error("Error: No asset selected.");
    return;
  }

  try {
    const res = await fetch(`/api/assets/${selectedAsset.assetID}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorResult = await res.json();
      throw new Error(errorResult.error || "Server error");
    }

    const result = await res.json();

    toast.success(result.message || "Asset deleted successfully!");
    fetchAssets();
    setShowDeleteModal(false);
  } catch (error) {
    toast.error(`Error: ${error.message}`);
  }
};

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-emerald-700 mb-6">
          Asset Management
        </h2>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Asset ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset) => (
                <tr key={asset.assetID}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {asset.assetID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{asset.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{asset.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleUpdateClick(asset)}
                      className="text-emerald-600 hover:text-emerald-900 mr-4"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(asset)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-emerald-700 mb-4">
                Update Asset
              </h3>
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Asset ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={selectedAsset?.assetID || ""}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    New Owner
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
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
                    className="w-full px-3 py-2 border rounded"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                  >
                    Update Asset
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-red-700 mb-4">
                Delete Asset
              </h3>
              <div className="mb-4">
                <p className="font-bold">Asset ID: {selectedAsset?.assetID}</p>
                <p>Owner: {selectedAsset?.owner}</p>
                <p>Value: {selectedAsset?.value}</p>
              </div>
              <p className="mb-6 text-gray-700">
                Are you sure you want to delete this asset?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetManagement;
