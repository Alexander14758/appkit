import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import DeployButton from "./component/DeployButon";
import GetBalance from "./component/GetBalance"; // Import GetBalance component

// Setup queryClient
const queryClient = new QueryClient();

// Get projectId
const projectId = "14848dd5f3d6d43d0b8afc73d46d2a93";

// Create metadata
const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://example.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Set networks
const networks = [baseSepolia];

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: { analytics: true },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

// Example usage in a React component
export default function App() {
  return (
    <AppKitProvider>
      <div>
        <appkit-button />
      </div>
      <GetBalance /> {/* ✅ Fix: Use the correct component */}
      <DeployButton />
    </AppKitProvider>
  );
}
