import { ethers } from "hardhat";

async function main() {
  console.log("Deploying SkillCredential contract...");

  const SkillCredential = await ethers.getContractFactory("SkillCredential");
  const skillCredential = await SkillCredential.deploy();

  await skillCredential.waitForDeployment();

  const contractAddress = await skillCredential.getAddress();
  console.log("SkillCredential deployed to:", contractAddress);

  // Verify contract on BaseScan (if on mainnet)
  if (process.env.NETWORK === "base") {
    console.log("Verifying contract on BaseScan...");
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.error("Contract verification failed:", error);
    }
  }

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    network: process.env.NETWORK || "localhost",
    deployedAt: new Date().toISOString(),
  };

  console.log("Deployment completed!");
  console.log("Contract address:", contractAddress);
  console.log("Update your .env file with: NEXT_PUBLIC_CREDENTIAL_CONTRACT_ADDRESS=" + contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

