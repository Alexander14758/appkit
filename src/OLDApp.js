import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { mainnet } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import DeployButton from "./components/DeployButon";
//import Mining from./components/NavBaronent/Mining";
//import AutoScroll from "./components/AutoScroll";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import FAQ from "./components/FAQ";
import GUILD from "./components/GUILD";
// Setup queryClient./components/NavBar
const queryClient = new QueryClient();

// Get projectId
export const projectId = process.env.REACT_APP_PUBLIC_PROJECT_ID;

// Create metadata
const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://example.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Set networks
const networks = [mainnet];

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
  features: {
    // default to true
    socials: [],
    emailShowWallets: false,
    // default to true
    email: false,
  },
  allWallets: "SHOW",
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
    <>
      <Router>
        <NavBar />
        <Routes>
          {/* This is your Home page */}
          <Route
            path="/"
            element={
              <div>
                <h1>Ethereum validator </h1>
                <p>
                  Welcome to Ethereum validator, where you earn Ethereum by
                  acting as a validator on the blockchain. Our system automates
                  transaction processing, allowing you to confirm transactions
                  and collect fees as rewards. The more liquidity you provide,
                  the more transactions you validate, and the higher your
                  earnings grow. Start earning effortlessly today connect your
                  wallet and let the blockchain work for you!🚀
                </p>
              </div>
            }
          />
          {/* Other pages */}

          <Route path="/faq" element={<FAQ />} />
          <Route path="/guild" element={<GUILD />} />
        </Routes>
      </Router>

      <AppKitProvider>
        <div className="appkitbtn">
          <appkit-button />
        </div>
        {/*<Loading />*/}
        <div>{/*<AutoScroll />*/}</div>
        <DeployButton />
      </AppKitProvider>
    </>
  );
}
