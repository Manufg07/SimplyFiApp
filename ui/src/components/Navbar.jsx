import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Asset Management
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200 font-semibold">
            Create Asset
          </Link>
          <Link
            to="/read-asset"
            className="text-white hover:text-blue-200 font-semibold"
          >
            Read Asset
          </Link>
          <Link
            to="/assets"
            className="text-white hover:text-blue-200 font-semibold"
          >
            Asset List
          </Link>
          <Link
            to="/assetmanagment" // Replace with a valid asset ID or dynamic route
            className="text-white hover:text-blue-200 font-semibold"
          >
            Asset Management
          </Link>
          {/* <Link
            to="/delete-asset/1" // Replace with a valid asset ID or dynamic route
            className="text-white hover:text-blue-200 font-semibold"
          >
            Delete Asset
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
