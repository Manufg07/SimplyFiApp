import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const DeleteAssetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState({ assetID: "", owner: "", value: "" });

  // Fetch asset details when the component mounts
  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await fetch(`/api/assets/${id}`);
        const result = await res.json();

        if (result.success) {
          setAsset(result.data);
        } else {
          toast.error(`Error: ${result.error}`);
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    };

    fetchAsset();
  }, [id]);

  const deleteAsset = async () => {
    try {
      const res = await fetch(`/api/assets/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Asset deleted successfully!");
        navigate("/assets");
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
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">
          Delete Asset
        </h2>
        <div className="mb-6">
          <p className="text-gray-700 font-bold">Asset ID: {asset.assetID}</p>
          <p className="text-gray-700 font-bold">Owner: {asset.owner}</p>
          <p className="text-gray-700 font-bold">Value: {asset.value}</p>
        </div>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this asset?
        </p>
        <button
          onClick={deleteAsset}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
        >
          Delete Asset
        </button>
      </div>
    </div>
  );
};

export default DeleteAssetPage;
