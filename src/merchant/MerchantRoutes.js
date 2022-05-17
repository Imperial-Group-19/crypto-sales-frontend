import React, { useEffect } from "react";
import { useWeb3Context } from "./features/Web3Context";

const MerchantRoutes = (props) => {
  const { connected, handleConnectWallet } = useWeb3Context();
  // Check if user has already connected wallet
  const checkWeb3Status = async () => {
    if (!connected) {
      handleConnectWallet();
    }
  };

  useEffect(() => {
    checkWeb3Status();
  }, []);

  return props.children;
};

export default MerchantRoutes;
