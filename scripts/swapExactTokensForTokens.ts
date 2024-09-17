import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const SHFL = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

    const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

    await helpers.impersonateAccount(TOKEN_HOLDER);
    const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);

    const   amountOut = ethers.parseUnits("1000", 18);
  
    const   amountInMax = ethers.parseUnits("200", 18);

    const USDC_Contract = await ethers.getContractAt("IERC20", USDC, impersonatedSigner);
    const SHFL_Contract = await ethers.getContractAt("IERC20", SHFL);
    
    const ROUTER = await ethers.getContractAt("IUniswapV2Router", ROUTER_ADDRESS, impersonatedSigner);

    await USDC_Contract.approve(ROUTER,  amountOut)

    const usdcBal = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const shflBal = await SHFL_Contract.balanceOf(impersonatedSigner.address);
    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

    console.log("usdc balance before swap", Number(usdcBal));
    console.log("shfl balance before swap", Number(shflBal));


    await ROUTER.swapExactTokensForTokens(
        amountOut,
        amountInMax,
        [USDC, SHFL],
        impersonatedSigner.address,
        deadline

    )


    const usdcBalAfter = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const shflBalAfter = await SHFL_Contract.balanceOf(impersonatedSigner.address);

    console.log("=========================================================");

    console.log("usdc balance after swap", Number(usdcBalAfter));
    console.log("dai balance after swap", Number(shflBalAfter));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
