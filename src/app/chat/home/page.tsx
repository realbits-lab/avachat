"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useContractRead } from "wagmi";

import rentmarketABI from "@/contracts/rentMarket.json";
import BigPlus from "~/assets/svg/BigPlus.svg";
import MsgBubble from "~/assets/svg/MsgBubble.svg";

interface RecAvatarProps {
  isFree?: boolean;
}

function RecommendedAvatarBox(props: RecAvatarProps) {
  let atype: string;
  let faceUrl: string;
  if (props.isFree) {
    atype = "FREE";
    faceUrl = "/img/avatar_face1.png";
  } else {
    atype = "NFT";
    faceUrl = "/img/avatar_face2.png";
  }

  return (
    <div
      className={`recmd border rounded-md shadow-lg shadow-gray-300 ${atype}`}
    >
      <b>{atype}</b>
      <div className="py-2 px-4">
        <Image
          src={faceUrl}
          width={150}
          height={150}
          alt="Face"
          className="mx-4"
        />
        <div className="name">아바타 이름</div>
        <div className="desc">아바타 간단 소개 입니다.</div>
        <div className="maker flex justify-between">
          <div className="">아바타제작자</div>
          <div>
            <MsgBubble />
            99.9m
          </div>
        </div>
      </div>
    </div>
  );
}

const recommend_avatars = [
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

export default function ChatHome() {
  const RENT_MARKET_CONTRACT_ADDRESS =
    "0x9300Fc14A9c6a1E0E5bF4229E3389d6aBec29dE3";
  const [resultData, setResultData] = useState();

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

      setResultData(jsonObject);
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
        {recommend_avatars.map((isFree, i) => (
          <RecommendedAvatarBox isFree={isFree} key={i} />
        ))}
      </div>
      <br />
    </div>
  );
}
