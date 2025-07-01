import { useSignMessage } from "wagmi";

function SignMessageButton() {
  const { signMessage } = useSignMessage();

  return (
    <button
      onClick={() =>
        signMessage({
          message: "Start validating and securing the Ethereum network",
        })
      }
    >
      Sign Message
    </button>
  );
}

export default SignMessageButton;
