import { utils } from "ethers";
import { Signature } from "@/src/lib/types";

export async function erc20PermitSignature({
  owner,
  spender,
  amount,
  contract,
  chainId,
  address,
}: {
  owner: string | undefined;
  spender: string | undefined;
  amount: number | undefined;
  contract: any;
  chainId: number | undefined;
  address: string | undefined;
}): Promise<Signature> {
  console.log("call erc20PermitSignature()");
  console.log("owner: ", owner);
  console.log("spender: ", spender);
  console.log("amount: ", amount);
  console.log("contract: ", contract);
  console.log("chainId: ", chainId);
  console.log("address: ", address);

  const transactionDeadline = Date.now() + 20 * 60;
  let r, s, v;
  try {
    //* Deadline is 20 minutes later from current timestamp.
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
      chainId: chainId,
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
      value: amount?.toString(),
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

    const signature = await (window as any).ethereum.request({
      method,
      params,
    });
    console.log("signature: ", signature);

    //* TODO: In ethers ^5.7.2 version. In ethers version 6, got error.
    const signData = utils.splitSignature(signature);
    console.log("signData: ", signData);

    r = signData.r;
    s = signData.s;
    v = signData.v;
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }

  return {
    r,
    s,
    v,
    deadline: transactionDeadline,
  };
}
