import React, { useState, useEffect } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, formatUnits } from "ethers";

export default function GetBalance() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function fetchBalance() {
      if (!isConnected || !address || !walletProvider) {
        setBalance(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true); // Set loading state
        const ethersProvider = new BrowserProvider(walletProvider);
        const balanceWei = await ethersProvider.getBalance(address);
        const formattedBalance = parseFloat(
          formatUnits(balanceWei, 18)
        ).toFixed(6); // Limit to 6 decimals
        setBalance(formattedBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(null); // Reset balance on error
      } finally {
        setLoading(false); // Stop loading state
      }
    }

    fetchBalance();
  }, [isConnected, address, walletProvider]); // Added walletProvider dependency

  return (
    <div>
      {isConnected ? (
        <p>My Liquidity: {loading ? "Loading..." : `${balance} ETH`}</p>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
}
