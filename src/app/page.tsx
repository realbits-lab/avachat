"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import WalletConnect from "@/src/components/WalletConnect";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <div className="p-8">
      {isConnected && <Link href="/chat/home">Go to Chat Home</Link>}
      <WalletConnect />
    </div>
  );
}
