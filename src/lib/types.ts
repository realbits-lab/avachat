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

export interface rentDataStruct {
  feeTokenAddress: string;
  isRentByToken: boolean;
  nftAddress: string;
  rentDuration: number;
  rentFee: number;
  rentFeeByToken: number;
  rentStartTimestamp: number;
  renteeAddress: string;
  renterAddress: string;
  serviceAddress: string;
  tokenId: number;
}

export interface AvatarProps {
  registerData?: registerDataStruct;
}
