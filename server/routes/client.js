const { profile } = require("./profile");
const { promises: fs } = require("fs");
const path = require("path");
const crypto = require("crypto");
const grpc = require("@grpc/grpc-js");
const { connect, signers } = require("@hyperledger/fabric-gateway");

class clientApplication {
  async submitTxn(
    organization,
    role, // 'admin', 'auditor', or 'user'
    channelName,
    chaincodeName,
    contractName,
    txnType,
    transientData,
    txnName,
    ...args
  ) {
    let orgProfile = profile[organization];

    // Dynamically select identity based on role
    const certPath = orgProfile[`${role}CertPath`];
    const keyDirectoryPath = orgProfile[`${role}KeyDirectoryPath`];

    if (!certPath || !keyDirectoryPath) {
      throw new Error(`Invalid role or missing credentials for role: ${role}`);
    }

    const client = await newGrpcConnection(
      orgProfile["tlsCertPath"],
      orgProfile["peerEndpoint"],
      orgProfile["peerHostAlias"]
    );

    const gateway = connect({
      client,
      identity: await newIdentity(certPath, orgProfile["mspId"]),
      signer: await newSigner(keyDirectoryPath),
      evaluateOptions: () => {
        return { deadline: Date.now() + 5000 }; // 5 seconds
      },
      endorseOptions: () => {
        return { deadline: Date.now() + 15000 }; // 15 seconds
      },
      submitOptions: () => {
        return { deadline: Date.now() + 5000 }; // 5 seconds
      },
      commitStatusOptions: () => {
        return { deadline: Date.now() + 60000 }; // 1 minute
      },
    });

    try {
      let network = await gateway.getNetwork(channelName);
      let contract = await network.getContract(chaincodeName, contractName);

      let resultBytes;

      if (txnType === "invokeTxn") {
        resultBytes = await contract.submitTransaction(txnName, ...args);
      } else if (txnType === "queryAuditor") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType === "queryUser") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType === "update") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType === "invokeTxn" || txnType === "Delete") {
        resultBytes = await contract.submitTransaction(txnName, ...args);
      } else {
        throw new Error(`Invalid transaction type: ${txnType}`);
      }

      console.log("*** Result:", resultBytes.toString());
      return Promise.resolve(resultBytes);
    } catch (error) {
      console.error("Error occurred:", error);
      return Promise.reject(error);
    } finally {
      gateway.close();
      client.close();
    }
  }
  
}

async function newGrpcConnection(tlsCertPath, peerEndpoint, peerHostAlias) {
  const tlsRootCert = await fs.readFile(tlsCertPath);
  const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
  return new grpc.Client(peerEndpoint, tlsCredentials, {
    "grpc.ssl_target_name_override": peerHostAlias,
  });
}

async function newIdentity(certPath, mspId) {
  const credentials = await fs.readFile(certPath);
  return { mspId, credentials };
}

async function newSigner(keyDirectoryPath) {
  const files = await fs.readdir(keyDirectoryPath);
  const keyPath = path.resolve(keyDirectoryPath, files[0]);
  const privateKeyPem = await fs.readFile(keyPath);
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  return signers.newPrivateKeySigner(privateKey);
}

module.exports = {
  clientApplication,
};
