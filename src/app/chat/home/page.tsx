"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useContractRead } from "wagmi";

import rentmarketABI from "@/contracts/rentMarket.json";
import { registerDataStruct } from "@/src/lib/types";
import Avatar from "@/src/app/chat/home/avatar";
import BigPlus from "~/assets/svg/BigPlus.svg";

export default function ChatHome() {
  const RENT_MARKET_CONTRACT_ADDRESS =
    "0x9300Fc14A9c6a1E0E5bF4229E3389d6aBec29dE3";
  const NFT_CONTRACT_ADDRESS = "0x57fa5aCCb57d5129eF6b9b9fb6170185B648eA2f";
  const [resultData, setResultData] = React.useState();

  // Get all register data array.
  const {
    data: dataRegisterData,
    isError: isErrorRegisterData,
    isLoading: isLoadingRegisterData,
    status: statusRegisterData,
  } = useContractRead({
    address: RENT_MARKET_CONTRACT_ADDRESS,
    abi: rentmarketABI.abi,
    functionName: "getAllRegisterData",
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

      // Filter nft address.
      const filteredJsonObject = jsonObject.filter(
        (data: registerDataStruct) =>
          data.nftAddress.toLowerCase() === NFT_CONTRACT_ADDRESS.toLowerCase()
      );

      setResultData(filteredJsonObject);
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
      <h1>채팅 계속하기</h1>
      <div className="flex gap-6">
        <Link href="/chat/sample/">
          <div className="border rounded-md px-5 py-2 bg-white hover:bg-[#F0F1FF]">
            <Image
              src="/img/avatar_face1.png"
              width={120}
              height={120}
              alt="Face"
            />
            <div className="name">AI Avatar 123</div>
          </div>
        </Link>

        <div className="more_chat rounded-md flex flex-col justify-center bg-[#f0f0f0] hover:bg-gray-200">
          <div className="name py-4">더보기</div>
          <BigPlus />
        </div>
      </div>

      <br />
      <h1>추천</h1>
      <div className="flex gap-6 flex-wrap">
        {resultData?.map((registerData: registerDataStruct, idx: number) => (
          <Avatar registerData={registerData} key={idx} />
        ))}
        {/* {resultData.map((isFree, idx) => (
          <RecommendedAvatarBox isFree={isFree} key={idx} />
        ))} */}
      </div>
      <br />
    </div>
  );
}
