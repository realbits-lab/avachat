import { utils } from "ethers";

export async function erc20PermitSignature({
  owner,
  spender,
  amount,
  contract,
  chain,
  address,
}) {
  console.log("call erc20PermitSignature()");
  console.log("owner: ", owner);
  console.log("spender: ", spender);
  console.log("amount: ", amount);
  console.log("contract: ", contract);
  console.log("chain: ", chain);
  console.log("address: ", address);

  try {
    //* Deadline is 20 minutes later from current timestamp.
    const transactionDeadline = Date.now() + 20 * 60;
    console.log("transactionDeadline: ", transactionDeadline);
    const nonce = await contract.read.nonces({ args: [owner] });
    console.log("nonce: ", nonce);
    const contractName = await contract.read.name();
    console.log("contractName: ", contractName);

    const EIP712Domain = [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ];
    const domain = {
      name: contractName,
      version: "1",
      chainId: chain.id,
      verifyingContract: contract.address,
    };
    const Permit = [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ];
    const message = {
      owner,
      spender,
      value: amount.toString(),
      nonce: nonce.toString(),
      deadline: transactionDeadline,
    };
    const msgParams = JSON.stringify({
      types: {
        EIP712Domain,
        Permit,
      },
      domain,
      primaryType: "Permit",
      message,
    });
    console.log("msgParams: ", msgParams);

    const params = [address, msgParams];
    const method = "eth_signTypedData_v4";
    // console.log("params: ", params);
    // console.log("method: ", method);

    const signature = await ethereum.request({
      method,
      params,
    });
    console.log("signature: ", signature);

    //* TODO: In ethers ^5.7.2 version. In ethers version 6, got error.
    const signData = utils.splitSignature(signature);
    console.log("signData: ", signData);

    const { r, s, v } = signData;
    return {
      r,
      s,
      v,
      deadline: transactionDeadline,
    };
  } catch (error) {
    console.error("error: ", error);
    return error;
  }
}
