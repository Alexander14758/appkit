import { useEffect, useRef } from "react";
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { sepolia } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import DeployButton from "../components/DeployButon";
import ConnectStatus from "../ConnectStatus";
import "./display.scss";
import "./Dashnav.css";
import { CiLock } from "react-icons/ci";

// Setup queryClient
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
const networks = [sepolia];

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
    socials: [],
    emailShowWallets: false,
    email: false,
  },
  allWallets: "SHOW",
  themeVariables: {
    "--w3m-color-mix": "#000a0e",
    "--w3m-color-mix-strength": 40,
    "--w3m-accent": "#007d81",
  },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default function Dashboard() {
  const menuIconRef = useRef(null);
  const navbarRef = useRef(null);
  const navbgRef = useRef(null);

  useEffect(() => {
    const menuIcon = menuIconRef.current;
    const navbar = navbarRef.current;
    const navbg = navbgRef.current;

    const handleToggle = () => {
      menuIcon.classList.toggle("bx-x");
      navbar.classList.toggle("active");
      navbg.classList.toggle("active");
    };

    if (menuIcon) {
      menuIcon.addEventListener("click", handleToggle);
    }

    return () => {
      if (menuIcon) {
        menuIcon.removeEventListener("click", handleToggle);
      }
    };
  }, []);

  return (
    <>
      <div>
        <header className="header fixed-top">
          <a href="#" className="logo">
            <ConnectStatus />
          </a>

          <i className="bx bx-menu" id="menu-icon" ref={menuIconRef}></i>

          <nav className="navbar" ref={navbarRef}>
            <a href="#">Dashboard </a>
            <a href="#">
              Portfolio
              <CiLock />
            </a>
            <a href="#">
              Withdraw
              <CiLock />
            </a>
            <a href="#">
              Histroy
              <CiLock />
            </a>
            <a href="#">
              Task
              <CiLock />
            </a>
          </nav>
        </header>
        <div className="nav-bg" ref={navbgRef}></div>

        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>

        <div id="title">
          <h2 className="para1">Become a Validator Connect Your Wallet</h2>
        </div>

        <AppKitProvider>
          <div className="appkitbtn">
            <appkit-button />
          </div>

          <div className="center-container">
            <DeployButton />
          </div>
        </AppKitProvider>
      </div>
    </>
  );
}
