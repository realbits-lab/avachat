import * as React from "react";
import {
  useAccount,
  useNetwork,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { formatEther, Address } from "viem";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { registerDataStruct, AvatarProps } from "@/src/lib/types";
import publicNFTABI from "@/contracts/publicNFT.json";
import rentmarketABI from "@/contracts/rentMarket.json";

export default function AvatarComponent(props: AvatarProps) {
  // console.log("props: ", props);

  //* You can divide free and commercial item based on this rentFee.
  const rentFee = (props.registerData?.rentFee || 0) / Math.pow(10, 18);
  // feeTokenAddress : "0xA6660c34F3A2BCaD5181363ac4Ba1f96136244E2"
  // nftAddress : "0x8fA1f12132Fd6770703BCABEFc7E1b0B47F81D80"
  // rentDuration : 86400
  // rentFee : 10000000000000000
  // rentFeeByToken : 1000000000000000000
  // tokenId : 18
  const RENT_MARKET_CONTRACT_ADDRESS =
    process.env.NEXT_PUBLIC_RENT_MARKET_CONTRACT_ADDRESS;
  const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
  const SERVICE_OWNER_ADDRESS = process.env.NEXT_PUBLIC_SERVICE_OWNER_ADDRESS;
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

  //* rentNFT function
  const {
    data: dataRentNFT,
    isError: isErrorRentNFT,
    isLoading: isLoadingRentNFT,
    write: writeRentNFT,
  } = useContractWrite({
    address: RENT_MARKET_CONTRACT_ADDRESS as Address,
    abi: rentmarketABI?.abi,
    functionName: "rentNFT",
    onSuccess(data) {
      // console.log("call onSuccess()");
      // console.log("data: ", data);
    },
    onError(error) {
      // console.log("call onSuccess()");
      // console.log("error: ", error);
    },
  });
  const {
    data: dataRentNFTTx,
    isError: isErrorRentNFTTx,
    isLoading: isLoadingRentNFTTx,
  } = useWaitForTransaction({
    hash: dataRentNFT?.hash,
    onSuccess(data) {},
    onError(error) {
      // console.log("call onError()");
      // console.log("error: ", error);
    },
  });

  const { data: dataRentNftByToken, write: writeRentNftByToken } =
    useContractWrite({
      address: RENT_MARKET_CONTRACT_ADDRESS as Address,
      abi: rentmarketABI.abi,
      functionName: "rentNFTByToken",
      onSuccess(data) {
        // console.log("call onSuccess()");
        // console.log("data: ", data);
      },
      onError(error) {
        // console.log("call onSuccess()");
        // console.log("error: ", error);
      },
    });
  const {
    isLoading: isLoadingRentNftByToken,
    isSuccess: isSuccessRentNftByToken,
  } = useWaitForTransaction({
    hash: dataRentNftByToken?.hash,
    onSuccess(data) {},
    onError(error) {
      // console.log("call onError()");
      // console.log("error: ", error);
    },
  });

  let atype: string;
  let faceUrl: string;
  if (rentFee === 0) {
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
        <Typography variant="h6">Price: {rentFee} matic</Typography>
        <Button
          color="primary"
          variant="outlined"
          disabled={
            props.registerData?.rentFee === 0 &&
            props.registerData?.rentFeeByToken === 0
          }
          onClick={async () => {
            writeRentNFT?.({
              args: [
                props.registerData?.nftAddress,
                props.registerData?.tokenId,
                SERVICE_OWNER_ADDRESS,
              ],
              value: BigInt(props.registerData?.rentFee || 0),
            });
          }}
        >
          {formatEther(BigInt(props.registerData?.rentFee || 0))}
        </Button>
      </div>
    </div>
  );
}
