import { Button } from "react-bootstrap";
import React from "react";
import { useWeb3Context } from "../merchant/features/Web3Context";
import { AiOutlineDisconnect } from "react-icons/ai";

const ConnectButton = () => {
  const { handleConnectWallet } = useWeb3Context();

  return (
    <div className="centered">
      <Button
        className="connect font-and-color button-payment-connect margin-top"
        variant="outline-success"
        onClick={handleConnectWallet}
      >
        <AiOutlineDisconnect className="large-icon"></AiOutlineDisconnect>{" "}
        Connect Wallet
      </Button>
    </div>
  );
};

export default ConnectButton;
