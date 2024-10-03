import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const LudoModule = buildModule("LudoModule", (m) => {


  const ludo = m.contract("Ludo");

  return { ludo };
});

export default LudoModule;


/**
 * LudoModule#Ludo - 0xe088bDa82042B82ABAA069D781d96CD74991CF27
 *  - https://sepolia-blockscout.lisk.com//address/0xe088bDa82042B82ABAA069D781d96CD74991CF27#code
 */
