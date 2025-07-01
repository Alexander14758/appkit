import React, { useState, useEffect } from "react";
import Web3 from "web3";
//import Chart from "chart.js/auto";

const EthereumApp = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [miningStatus, setMiningStatus] = useState("Mining paused");
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [successfulAttempts, setSuccessfulAttempts] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [transactionHash, setTransactionHash] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      loadAccount(web3Instance);
    } else {
      console.error("MetaMask not detected");
    }
  }, []);

  const loadAccount = async (web3Instance) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
      setBalance(web3Instance.utils.fromWei(balanceWei, "ether"));
    } catch (error) {
      console.error("Error loading account", error);
    }
  };

  const startMining = () => {
    setMiningStatus("Mining in progress");
    setTotalAttempts((prev) => prev + 1);

    if (Math.random() > 0.5) {
      setSuccessfulAttempts((prev) => prev + 1);
      setTotalProfit(
        (prev) => prev + parseFloat((Math.random() * 0.01).toFixed(4))
      );
    }
  };

  const sendTransaction = async () => {
    if (!web3 || !account) return;
    try {
      const recipient = "0xRecipientAddressHere";
      const amount = "0.01";
      const tx = await web3.eth.sendTransaction({
        from: account,
        to: recipient,
        value: web3.utils.toWei(amount, "ether"),
      });
      setTransactionHash(tx.transactionHash);
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  return (
    <div>
      <h2>Ethereum Account</h2>
      {account ? (
        <div>
          <p>Address: {account}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      ) : (
        <p>Loading account...</p>
      )}
      <button onClick={startMining}>Start Mining</button>
      <p>Status: {miningStatus}</p>
      <p>Total Attempts: {totalAttempts}</p>
      <p>Successful Attempts: {successfulAttempts}</p>
      <p>Total Profit: {totalProfit.toFixed(4)} ETH</p>
      <button onClick={sendTransaction}>Send ETH</button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};

export default EthereumApp;

export function truncateAddress(address) {
  if (address.length <= 10) return address;
  return address.slice(0, 6) + "......" + address.slice(-4);
}

export function generateRandomEthAddress() {
  const chars = "abcdef0123456789";
  let address = "0x";
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

export async function loadAccount(web3Instance, setAccount, setBalance) {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
    setBalance(web3Instance.utils.fromWei(balanceWei, "ether"));
  } catch (error) {
    console.error("Error loading account", error);
  }
}
