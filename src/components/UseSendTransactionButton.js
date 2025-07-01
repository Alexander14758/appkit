import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

function UseSendTransactionButton() {
  const { sendTransaction } = useSendTransaction();

  return (
    <button
      onClick={() =>
        sendTransaction({
          to: "0x81694eE15fa672AFa4b98405f037021A4F3a4A10",
          value: parseEther("0.02"),
        })
      }
    >
      Send transaction
    </button>
  );
}

export default UseSendTransactionButton;
