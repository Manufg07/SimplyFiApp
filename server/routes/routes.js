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
      "KBA-Asset", // Chaincode Name
      "AssetContract", // Contract Name
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
      "KBA-Asset",
      "AssetContract",
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
      "KBA-Asset",
      "AssetContract",
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
    const { newValue } = req.body;

    const client = new clientApplication();
    const result = await client.submitTxn(
      "org1",
      "admin",
      "autochannel",
      "KBA-Asset",
      "AssetContract",
      "Update",
      "",
      "UpdateAsset",
      assetID,
      newValue.toString()
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

    const client = new clientApplication();
    await client.submitTxn(
      "org1",
      "admin",
      "autochannel",
      "KBA-Asset",
      "AssetContract",
      "Delete",
      "",
      "DeleteAsset",
      assetID
    );

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
