import "core-js/stable";
import "regenerator-runtime/runtime";
import { waitForAppScreen, zemu, genericTx, nano_models,SPECULOS_ADDRESS, txFromEtherscan} from './test.fixture';
import { ethers } from "ethers";
import { parseEther, parseUnits} from "ethers/lib/utils";

// EDIT THIS: Replace with your contract address
const contractAddr = "0x99a58482bd75cbab83b27ec03ca68ff489b5788f";
// EDIT THIS: Replace `boilerplate` with your plugin name
const pluginName = "origindefi";
const testNetwork = "ethereum";
const abi_path = `../networks/${testNetwork}/${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// Test from replayed transaction: https://etherscan.io/tx/0x3630e250ba84e9e2ee64e1b89f4bb85535ce0894da7c099e221ea91ec1a3469f
// EDIT THIS: build your own test
nano_models.forEach(function(model) {
  jest.setTimeout(100000)
  test('[Nano ' + model.letter + '] Exchange stETH for OETH', zemu(model, async (sim, eth) => {

  // The rawTx of the tx up above is accessible through: https://etherscan.io/getRawTx?tx=0x3630e250ba84e9e2ee64e1b89f4bb85535ce0894da7c099e221ea91ec1a3469f
  const serializedTx = txFromEtherscan("0x02f903530181a08405f5e100850947c237668305f9d39499a58482bd75cbab83b27ec03ca68ff489b5788f80b902e4353ca424000000000000000000000000ae7ab96520de3a18e5e111b5eaab095312d7fe8400000000000000000000000021e27a5e5513d6e65c4f830167390997aa84843a000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000094b17476a93b3262d87b9a326965d1e91f9c13e7000000000000000000000000856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c272ba13d247538d000000000000000000000000000000000000000000000000c22676e0b7b70000c080a00482f5bacae7f30a0cfbc4e0a66353565f4d7be729de405e3f3178c6e1fea42ca045f3c2f3495daed6dfe313dfbf2d1d161a7c6162c7749938210aaacf7a6c6019");

  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
  );

  const right_clicks = model.letter === 'S' ? 9 : 5;

  // Wait for the application to actually load and parse the transaction
  await waitForAppScreen(sim);
  // Navigate the display by pressing the right button `right_clicks` times, then pressing both buttons to accept the transaction.
  await sim.navigateAndCompareSnapshots('.', model.name + '_curve_router_exchange_steth_for_oeth', [right_clicks, 0]);

  await tx;
  }));
});

// Test from replayed transaction: https://etherscan.io/tx/0x343eff1391bddc1000552db0d687a3e3d5ad8f2b7d71978ff3a5593c712e1c88
// EDIT THIS: build your own test
nano_models.forEach(function(model) {
  jest.setTimeout(100000)
  test('[Nano ' + model.letter + '] Exchange OETH for RETH', zemu(model, async (sim, eth) => {

  // The rawTx of the tx up above is accessible through: https://etherscan.io/getRawTx?tx=0x343eff1391bddc1000552db0d687a3e3d5ad8f2b7d71978ff3a5593c712e1c88
  const serializedTx = txFromEtherscan("0x02f903540182066d8405f5e10085090abbf894830813629499a58482bd75cbab83b27ec03ca68ff489b5788f80b902e4353ca424000000000000000000000000856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc300000000000000000000000094b17476a93b3262d87b9a326965d1e91f9c13e7000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000f3159811670c117c372428d4e69ac32325e4d0f000000000000000000000000ae78736cd615f374d3085123a210448e74fc63930000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000013fbe85edc90000c001a0f223a3e0b2da75b575badcdbd52523d038af990baf5fe8ebd6828b923ef6b37aa064ae23da280cf7106bd1c87b85816d6f5e06c594c006d03b252e17b5c86185ff");

  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
  );

  const right_clicks = model.letter === 'S' ? 9 : 5;

  // Wait for the application to actually load and parse the transaction
  await waitForAppScreen(sim);
  // Navigate the display by pressing the right button `right_clicks` times, then pressing both buttons to accept the transaction.
  await sim.navigateAndCompareSnapshots('.', model.name + '_curve_router_exchange_oeth_for_reth', [right_clicks, 0]);

  await tx;
  }));
});

// Test from constructed transaction
// EDIT THIS: build your own test
/*nano_models.forEach(function(model) {
  jest.setTimeout(20000)
  test('[Nano ' + model.letter + '] Swap Exact Eth For Tokens', zemu(model, async (sim, eth) => {
  const contract = new ethers.Contract(contractAddr, abi);

  // Constants used to create the transaction
  // EDIT THIS: Remove what you don't need
  const amountOutMin = parseUnits("28471151959593036279", 'wei');
  const WETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  const SUSHI = "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2";
  const path = [WETH, SUSHI];
  const deadline = Number(1632843280);
  // We set beneficiary to the default address of the emulator, so it maches sender address
  const beneficiary = SPECULOS_ADDRESS;

  // EDIT THIS: adapt the signature to your method
  // signature: swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
  // EDIT THIS: don't call `swapExactETHForTokens` but your own method and adapt the arguments.
  const {data} = await contract.populateTransaction.swapExactETHForTokens(amountOutMin, path, beneficiary ,deadline);

  // Get the generic transaction template
  let unsignedTx = genericTx;
  // Modify `to` to make it interact with the contract
  unsignedTx.to = contractAddr;
  // Modify the attached data
  unsignedTx.data = data;
  // EDIT THIS: get rid of this if you don't wish to modify the `value` field.
  // Modify the number of ETH sent
  unsignedTx.value = parseEther("0.1");

  // Create serializedTx and remove the "0x" prefix
  const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);

  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx
  );

  const right_clicks = model.letter === 'S' ? 7 : 5;

  // Wait for the application to actually load and parse the transaction
  await waitForAppScreen(sim);
  // Navigate the display by pressing the right button 10 times, then pressing both buttons to accept the transaction.
  // EDIT THIS: modify `10` to fix the number of screens you are expecting to navigate through.
  await sim.navigateAndCompareSnapshots('.', model.name + '_swap_exact_eth_for_tokens', [right_clicks, 0]);

  await tx;
  }));
});*/
