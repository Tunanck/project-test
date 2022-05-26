import { ethers } from "hardhat";
// import addressUtils from "../utils/addresses";
import hre from "hardhat";
async function main() {
  const USDTToken = await ethers.getContractFactory("USDTToken");
  const wis = await USDTToken.deploy();
  await wis.deployed();
  console.log("WIS token is deployed to :", wis.address);
  // await addressUtils.saveAddresses(hre.network.name, { WIS: wis.address });
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});