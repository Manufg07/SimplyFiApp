let profile = {
  org1: {
    cryptoPath:
      "../../SimplyFi/organizations/peerOrganizations/org1.simplyfi.com",
    // Admin
    adminKeyDirectoryPath:
      "../../SimplyFi/organizations/peerOrganizations/org1.simplyfi.com/users/Admin@org1.simplyfi.com/msp/keystore/",
    adminCertPath:
      "../../SimplyFi/organizations/peerOrganizations/org1.simplyfi.com/users/Admin@org1.simplyfi.com/msp/signcerts/cert.pem",
    // Auditor
    auditorCertPath:
      "../../SimplyFi/organizations/peerOrganizations/org1.simplyfi.com/users/Auditor@org1.simplyfi.com/msp/signcerts/cert.pem",
    auditorKeyDirectoryPath:
      "../../SimplyFi/organizations/peerOrganizations/org1.simplyfi.com/users/Auditor@org1.simplyfi.com/msp/keystore/",
    // User
    userCertPath:
      "../../SimplyFi/organizations/peerOrganizations/org1.simplyfi.com/users/User1@org1.simplyfi.com/msp/signcerts/cert.pem",
    userKeyDirectoryPath:
      "../../SimplyFi/organizations/peerOrganizations/org1.simplyfi.com/users/User1@org1.simplyfi.com/msp/keystore/",

    tlsCertPath:
      "../../SimplyFi/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt",
    peerEndpoint: "localhost:7051",
    peerHostAlias: "peer0.org1.simplyfi.com",
    mspId: "Org1MSP",
  },
  org2: {
    cryptoPath:
      "../../SimplyFi/organizations/peerOrganizations/org2.simplyfi.com",
    // Admin
    adminKeyDirectoryPath:
      "../../SimplyFi/organizations/peerOrganizations/org2.simplyfi.com/users/Admin@org2.simplyfi.com/msp/keystore/",
    adminCertPath:
      "../../SimplyFi/organizations/peerOrganizations/org2.simplyfi.com/users/Admin@org2.simplyfi.com/msp/signcerts/cert.pem",
    // Auditor
    auditorCertPath:
      "../../SimplyFi/organizations/peerOrganizations/org2.simplyfi.com/users/Auditor@org2.simplyfi.com/msp/signcerts/cert.pem",
    auditorKeyDirectoryPath:
      "../../SimplyFi/organizations/peerOrganizations/org2.simplyfi.com/users/Auditor@org2.simplyfi.com/msp/keystore/",
    // User
    userCertPath:
      "../../SimplyFi/organizations/peerOrganizations/org2.simplyfi.com/users/User1@org2.simplyfi.com/msp/signcerts/cert.pem",
    userKeyDirectoryPath:
      "../../SimplyFi/organizations/peerOrganizations/org2.simplyfi.com/users/User1@org2.simplyfi.com/msp/keystore/",

    tlsCertPath:
      "../../SimplyFi/organizations/peerOrganizations/org2.simplyfi.com/peers/peer0.org2.simplyfi.com/tls/ca.crt",
    peerEndpoint: "localhost:7051",
    peerHostAlias: "peer0.org2.simplyfi.com",
    mspId: "Org2MSP",
  },
};
module.exports = { profile };
