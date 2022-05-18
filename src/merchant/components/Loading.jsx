import React, { useEffect } from "react";
import { useWeb3Context } from "../features/Web3Context";

const Loading = () => {
  const { connected, handleConnectWallet } = useWeb3Context();

  const checkWeb3Status = async () => {
    if (!connected) {
      handleConnectWallet();
    }
  };

  useEffect(() => {
    checkWeb3Status();
  }, []);

  return <div className="centered">Loading...</div>;
};

export default Loading;
