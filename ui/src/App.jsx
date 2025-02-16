import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import CreateAssetPage from "./components/CreateAssetPage";
import ReadAssetPage from "./components/ReadAssetPage";
import UpdateAssetPage from "./components/UpdateAssetPage";
import DeleteAssetPage from "./components/DeleteAssetPage";
import AssetListPage from "./components/AssetListPage";
import AssetManagement from "./components/AssetManagement";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<CreateAssetPage />} />
            <Route path="/read-asset" element={<ReadAssetPage />} />
            <Route path="/update-asset/:id" element={<UpdateAssetPage />} />
            <Route path="/delete-asset/:id" element={<DeleteAssetPage />} />
            <Route path="/assets" element={<AssetListPage />} />
            <Route path="/assetmanagment" element={<AssetManagement />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
