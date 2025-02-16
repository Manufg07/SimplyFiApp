const express = require("express");
const router = express.Router();
const { clientApplication } = require("./client");

// POST /assets - Create Asset (Admin only)
router.post("/assets", async (req, res) => {
  try {
    const { assetID, owner, value } = req.body;
    const client = new clientApplication();

    const result = await client.submitTxn(
      "org1", // Organization
      "admin", // Role
      "autochannel", // Channel
      "KBA-Automobile", // Chaincode Name
      "AssetTransfer", // Contract Name
      "invokeTxn", // Transaction Type
      "", // Transient Data
      "CreateAsset", // Function Name
      assetID,
      owner,
      value.toString()
    );

    const decoded = new TextDecoder().decode(result);
    res.status(201).json({
      success: true,
      data: JSON.parse(decoded),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /assets - Get All Assets (Auditor only)
router.get("/assets", async (req, res) => {
  try {
    const client = new clientApplication();
    const result = await client.submitTxn(
      "org1",
      "auditor",
      "autochannel",
      "KBA-Automobile",
      "AssetTransfer",
      "queryAuditor",
      "",
      "GetAllAssets"
    );

    const decoded = new TextDecoder().decode(result);
    res.status(200).json({
      success: true,
      data: JSON.parse(decoded),
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      error: "Access denied. Auditor role required.",
    });
  }
});

// GET /assets/:id - Read Asset (User/Auditor)
router.get("/assets/:id", async (req, res) => {
  try {
    const { id: assetID } = req.params;
    const role = req.query.role || "user"; // Default to 'user'

    const client = new clientApplication();
    const result = await client.submitTxn(
      "org1",
      role,
      "autochannel",
      "KBA-Automobile",
      "AssetTransfer",
      "queryUser",
      "",
      "ReadAsset",
      assetID
    );

    const decoded = new TextDecoder().decode(result);
    res.status(200).json({
      success: true,
      data: JSON.parse(decoded),
    });
  } catch (error) {
    res.status(error.message.includes("authorized") ? 403 : 404).json({
      success: false,
      error: error.message,
    });
  }
});

// PUT /assets/:id - Update Asset (Admin only)
router.put("/assets/:id", async (req, res) => {
  try {
    const { id: assetID } = req.params;
    const { newValue, newOwner } = req.body;

    const client = new clientApplication();
    const result = await client.submitTxn(
      "org1",
      "admin",
      "autochannel",
      "KBA-Automobile",
      "AssetTransfer",
      "invokeTxn",
      "",
      "UpdateAsset",
      assetID,
      newValue,
      newOwner
    );

    const decoded = new TextDecoder().decode(result);
    res.status(200).json({
      success: true,
      data: JSON.parse(decoded),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE /assets/:id - Delete Asset (Admin only)
router.delete("/assets/:id", async (req, res) => {
  try {
    const { id: assetID } = req.params;
    console.log(`Deleting asset: ${assetID}`); // Log assetID

    const client = new clientApplication();
    const result = await client.submitTxn(
      "org1",
      "admin",
      "autochannel",
      "KBA-Automobile",
      "AssetTransfer",
      "Delete",
      "",
      "DeleteAsset",
      assetID
    );

    const decoded = new TextDecoder().decode(result);

let parsedResult;
try {
  parsedResult = JSON.parse(decoded);
} catch (error) {
  console.error("JSON Parse Error:", error.message, "Response:", decoded);
  parsedResult = { message: decoded }; // Handle as plain text if JSON fails
}

res.status(200).json({
  success: true,
  message: parsedResult.message,
});
} catch (error) {
    console.error("Delete Asset Error:", error); // Log full error
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
