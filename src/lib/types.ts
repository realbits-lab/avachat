import React from "react";

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface registerDataStruct {
  feeTokenAddress: string;
  nftAddress: string;
  rentDuration: number;
  rentFee: number;
  rentFeeByToken: number;
  tokenId: number;
}

export interface AvatarProps {
  registerData?: registerDataStruct;
}
