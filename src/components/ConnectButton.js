import { Button} from "react-bootstrap";
import React from "react";
import { useWeb3Context } from "../merchant/features/Web3Context";

const ConnectButton = () => {

  const { handleConnectWallet } = useWeb3Context();

  return (
    <Button variant="outline-secondary" onClick={handleConnectWallet}>Connect Wallet</Button>
  );
};

export default ConnectButton;