import { configureChains, WagmiConfig, createConfig } from "wagmi";
import { polygon, polygonMumbai, localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

// Set wagmi client
const chains = [polygonMumbai];

const {
  publicClient: wagmiPublicClient,
  webSocketPublicClient: wagmiWebSocketPublicClient,
} = configureChains(chains, [publicProvider()]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient: wagmiPublicClient,
  webSocketPublicClient: wagmiWebSocketPublicClient,
});
