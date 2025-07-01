import { useAppKitAccount } from "@reown/appkit/react";
import { BiWifi, BiWifiOff } from "react-icons/bi"; // import wifi icons
import "./displayv2.scss";

function ConnectStatus() {
  const { isConnected } = useAppKitAccount();
  return (
    <div>
      <p className="para2">
        <strong></strong>
        {isConnected ? (
          <>
            Connected <BiWifi style={{ color: "limegreen" }} />
          </>
        ) : (
          <>
            Not Connected <BiWifiOff style={{ color: "red" }} />
          </>
        )}
      </p>
    </div>
  );
}

export default ConnectStatus;
