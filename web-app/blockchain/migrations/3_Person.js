const contract = artifacts.require("Person");

module.exports = async function (deployer, network, accounts) {
  console.log("Deploying contracts...");

  // 打印正在使用的部署账户
  const deployingAccount = accounts[2];
  console.log(`Deploying account: ${deployingAccount}`);

  // 获取并打印账户余额
  const balance = await web3.eth.getBalance(deployingAccount);
  console.log(`Account balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);

  // 部署迁移合约

  const id = "29793470";
  const nationality= "Singapore";
  const nric = "S9999999G";
  const passport = "K9999999G";
  const name = "JASPER";
  const address = "555 Abc AVE, Singapore 555555";
  await deployer.deploy(contract, id, nationality, nric, passport, name, address, { from: deployingAccount });
};