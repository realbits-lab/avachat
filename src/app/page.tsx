"use client";
import Link from "next/link";
import { configureChains, WagmiConfig, createConfig } from "wagmi";
import { polygon, polygonMumbai, localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export default function Home() {
  // Set wagmi client
  const chains = [polygonMumbai];

  const {
    publicClient: wagmiPublicClient,
    webSocketPublicClient: wagmiWebSocketPublicClient,
  } = configureChains(chains, [publicProvider()]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [new MetaMaskConnector({ chains })],
    publicClient: wagmiPublicClient,
    webSocketPublicClient: wagmiWebSocketPublicClient,
  });

  return (
    <div className="p-8">
      <WagmiConfig config={wagmiConfig}>
        <Link href="/chat/home">Go to Chat Home</Link>
      </WagmiConfig>
    </div>
  );
}
