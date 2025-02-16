import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AssetListPage = () => {
  const [assets, setAssets] = useState([]);

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

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="bg-blue-100 p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Asset List Auditor
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Asset ID</th>
                <th className="px-4 py-2">Owner</th>
                <th className="px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.assetID}>
                  <td className="border px-4 py-2">{asset.assetID}</td>
                  <td className="border px-4 py-2">{asset.owner}</td>
                  <td className="border px-4 py-2">{asset.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetListPage;
