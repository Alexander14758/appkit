import React, { useState, useEffect } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, formatUnits } from "ethers";

export default function GetBalance() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBalance() {
      if (!isConnected || !address || !walletProvider) {
        setBalance(null);
        localStorage.setItem("walletLiquidity", "0.0000"); // fallback
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const ethersProvider = new BrowserProvider(walletProvider);
        const balanceWei = await ethersProvider.getBalance(address);
        const formattedBalance = parseFloat(
          formatUnits(balanceWei, 18)
        ).toFixed(6);

        setBalance(formattedBalance);
        localStorage.setItem("walletLiquidity", formattedBalance); // ✅ Save here s
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(null);
        localStorage.setItem("walletLiquidity", "0.0000"); // fallback on error
      } finally {
        setLoading(false);
      }
    }

    fetchBalance();
  }, [isConnected, address, walletProvider]);

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
