import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("Start deploying...");
  const [deployer] = await ethers.getSigners();
  const Factory = await ethers.getContractFactory("XSwapMulticall", deployer);
  const contract = await Factory.deploy();
  console.log(`Deploying at tx ${contract.deploymentTransaction()?.hash}`);

  await contract.waitForDeployment();
  console.log(`Deployer address: ${await deployer.getAddress()}`);
  console.log("Contract deployed at address:", contract.target);
  console.log(
    "Contract deployed at block:",
    await ethers.provider.getBlockNumber()
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
