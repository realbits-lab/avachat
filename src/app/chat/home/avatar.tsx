import * as React from "react";
import { useContractRead } from "wagmi";
import Avatar from "@mui/material/Avatar";

import { registerDataStruct, AvatarProps } from "@/src/lib/types";
import publicNFTABI from "@/contracts/publicNFT.json";
import MsgBubble from "~/assets/svg/MsgBubble.svg";

export default function AvatarComponent(props: AvatarProps) {
  // console.log("props: ", props);
  // feeTokenAddress : "0xA6660c34F3A2BCaD5181363ac4Ba1f96136244E2"
  // nftAddress : "0x8fA1f12132Fd6770703BCABEFc7E1b0B47F81D80"
  // rentDuration : 86400
  // rentFee : 10000000000000000
  // rentFeeByToken : 1000000000000000000
  // tokenId : 18
  const NFT_CONTRACT_ADDRESS = "0x57fa5aCCb57d5129eF6b9b9fb6170185B648eA2f";
  const [metadata, setMetadata] = React.useState();

  const {
    data: dataTokenURI,
    isError: isErrorTokenURI,
    isLoading: isLoadingTokenURI,
    status: statusTokenURI,
  } = useContractRead({
    address: props.registerData?.nftAddress as `0x${string}`,
    abi: publicNFTABI.abi,
    functionName: "tokenURI",
    args: [props.registerData?.tokenId],
    // watch: true,
    onSuccess(data: string) {
      // console.log("call onSuccess()");
      // console.log("data: ", data);

      fetch(data).then((fetchResult) =>
        fetchResult.blob().then((tokenMetadata) =>
          tokenMetadata.text().then((metadataJsonTextData) => {
            // console.log("metadataJsonTextData: ", metadataJsonTextData);
            const metadata = JSON.parse(metadataJsonTextData);
            // description : "AvaChat NFT project"
            // image : "https://avachat-nft.s3.ap-northeast-2.amazonaws.com/image/1.png"
            // name : "AvaChat #1"
            // realbits :
            // glb_url : "https://avachat-nft.s3.ap-northeast-2.amazonaws.com/glb/1.glb"
            // vrm_url : "https://avachat-nft.s3.ap-northeast-2.amazonaws.com/vrm/1.vrm"
            // symbol : "ACT"
            // console.log("metadata: ", metadata);
            setMetadata(metadata);
          })
        )
      );
    },
    onError(error) {
      // console.log("call onError()");
      // console.log("error: ", error);
    },
    onSettled(data, error) {
      // console.log("call onSettled()");
      // console.log("data: ", data);
      // console.log("error: ", error);
    },
  });

  React.useEffect(() => {}, []);

  let atype: string;
  let faceUrl: string;
  if (props.registerData?.rentFee === 0) {
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
        <Avatar
          alt="avatar image"
          src={metadata?.image}
          sx={{ width: 102, height: 102 }}
        />

        <div className="name">{metadata?.name}</div>
        <div className="desc">{metadata?.description}</div>
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
