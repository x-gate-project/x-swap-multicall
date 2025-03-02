"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
async function main() {
    console.log('Start deploying...');
    const [deployer] = await hardhat_1.ethers.getSigners();
    const Factory = await hardhat_1.ethers.getContractFactory('UniswapV2Factory', deployer);
    const feeToSetterAddress = process.env.FEE_TO_SETTER_ADDRESS || deployer.address;
    const contract = await Factory.deploy(feeToSetterAddress);
    console.log(`Deploying at tx ${contract.deploymentTransaction()?.hash}`);
    await contract.waitForDeployment();
    console.log(`Deployer address: ${await deployer.getAddress()}`);
    console.log('Contract deployed at address:', contract.target);
    console.log('Contract deployed at block:', await hardhat_1.ethers.provider.getBlockNumber());
    const UniswapV2Pair = await hardhat_1.ethers.getContractFactory("UniswapV2Pair");
    const bytecode = UniswapV2Pair.bytecode;
    const INIT_CODE_PAIR_HASH = hardhat_1.ethers.keccak256(bytecode);
    console.log("Init code pair hash:", INIT_CODE_PAIR_HASH);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
