"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useContractRead, useAccount } from "wagmi";
import { Address } from "viem";

import rentmarketABI from "@/contracts/rentMarket.json";
import { registerDataStruct, rentDataStruct } from "@/src/lib/types";
import BigPlus from "~/assets/svg/BigPlus.svg";
import AvatarComponent from "@/src/components/AvatarComponent";

export default function ChatHome() {
  const RENT_MARKET_CONTRACT_ADDRESS =
    process.env.NEXT_PUBLIC_RENT_MARKET_CONTRACT_ADDRESS;
  const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
  const [registerDataArray, setRegisterDataArray] = React.useState<
    registerDataStruct[]
  >([]);
  const [freeRegisterDataArray, setFreeRegisterDataArray] = React.useState<
    registerDataStruct[]
  >([]);
  const [nonFreeRegisterDataArray, setNonFreeRegisterDataArray] =
    React.useState<registerDataStruct[]>([]);
  const [rentDataArray, setRentDataArray] = React.useState<rentDataStruct[]>(
    []
  );

  const { address } = useAccount();

  // Get all rented data array.
  const {
    data: dataRentData,
    isError: isErrorRentData,
    isLoading: isLoadingRentData,
    status: statusRentData,
  } = useContractRead({
    address: RENT_MARKET_CONTRACT_ADDRESS as Address,
    abi: rentmarketABI.abi,
    functionName: "getAllRentData",
    // cacheOnBlock: true,
    // watch: true,
    onSuccess(data) {
      console.log("call onSuccess()");

      // Change BitInt to Number format,
      // because JSON can't parse BigInt format.
      const jsonString = JSON.stringify(data, (key, value) => {
        return typeof value === "bigint" ? Number(value) : value;
      });
      const jsonObject = JSON.parse(jsonString);
      // console.log("jsonObject: ", jsonObject);

      // Filter nft address and wallet address.
      const filteredJsonObject = jsonObject.filter(
        (data: rentDataStruct) =>
          data.nftAddress.toLowerCase() ===
            NFT_CONTRACT_ADDRESS?.toLowerCase() &&
          data.renteeAddress.toLowerCase() === address?.toLowerCase()
      );
      // console.log("filteredJsonObject: ", filteredJsonObject);

      setRentDataArray(filteredJsonObject);
    },
    onError(error) {
      console.log("call onError()");
      console.log("error: ", error);
    },
    onSettled(data, error) {
      // console.log("call onSettled()");
      // console.log("data: ", data);
      // console.log("error: ", error);
    },
  });

  // Get all register data array.
  const {
    data: dataRegisterData,
    isError: isErrorRegisterData,
    isLoading: isLoadingRegisterData,
    status: statusRegisterData,
  } = useContractRead({
    address: RENT_MARKET_CONTRACT_ADDRESS as Address,
    abi: rentmarketABI.abi,
    functionName: "getAllRegisterData",
    // cacheOnBlock: true,
    // watch: true,
    onSuccess(data) {
      console.log("call onSuccess()");
      console.log("data: ", data);

      // Change BitInt to Number format,
      // because JSON can't parse BigInt format.
      const jsonString = JSON.stringify(data, (key, value) => {
        return typeof value === "bigint" ? Number(value) : value;
      });
      const jsonObject = JSON.parse(jsonString);
      console.log("jsonObject: ", jsonObject);

      // Filter nft address.
      const filteredJsonObject = jsonObject.filter(
        (data: registerDataStruct) =>
          data.nftAddress.toLowerCase() === NFT_CONTRACT_ADDRESS?.toLowerCase()
      );
      setRegisterDataArray(filteredJsonObject);

      const filteredFreeJsonObject = jsonObject.filter(
        (data: registerDataStruct) =>
          data.nftAddress.toLowerCase() ===
            NFT_CONTRACT_ADDRESS?.toLowerCase() &&
          data.rentFee === 0 &&
          data.rentFeeByToken === 0
      );
      setFreeRegisterDataArray(filteredFreeJsonObject);

      const filteredNonFreeJsonObject = jsonObject.filter(
        (data: registerDataStruct) =>
          data.nftAddress.toLowerCase() ===
            NFT_CONTRACT_ADDRESS?.toLowerCase() &&
          (data.rentFee !== 0 || data.rentFeeByToken !== 0)
      );
      setNonFreeRegisterDataArray(filteredNonFreeJsonObject);
    },
    onError(error) {
      console.log("call onError()");
      console.log("error: ", error);
    },
    onSettled(data, error) {
      // console.log("call onSettled()");
      // console.log("data: ", data);
      // console.log("error: ", error);
    },
  });

  return (
    <div className="px-4">
      <h1>Rented avatar list</h1>

      <div className="flex gap-6 flex-wrap">
        {rentDataArray?.map((registerData: rentDataStruct, idx: number) => (
          <AvatarComponent registerData={registerData} key={idx} />
        ))}
      </div>

      <br />

      <h1>Free avatar list</h1>

      <div className="flex gap-6 flex-wrap">
        {freeRegisterDataArray?.map(
          (registerData: registerDataStruct, idx: number) => (
            <AvatarComponent registerData={registerData} key={idx} />
          )
        )}
      </div>

      <br />

      <h1>Avatar market</h1>

      <div className="flex gap-6 flex-wrap">
        {nonFreeRegisterDataArray?.map(
          (registerData: registerDataStruct, idx: number) => (
            <AvatarComponent registerData={registerData} key={idx} />
          )
        )}
      </div>

      <br />
    </div>
  );
}
