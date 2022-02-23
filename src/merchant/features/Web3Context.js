import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const Web3Context = createContext(null);

export const useWeb3Context = () => {

  const web3Context = useContext(Web3Context);

  const { web3Data } = web3Context;

  return { ...web3Data };
};

export const Web3ContextProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();

  const contractAddress = "0xaE7b635D1C9832Ee9c4ede4C5b261c61b79BD728";

  const providerOptions = {
    // Injected providers
    injected: {
      display: {
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png",
        name: "Metamask",
        description: "Connect with the wallet in your browser",
      },
      package: null,
    },
  };

  const web3modal = new Web3Modal({
    network: "mumbai",
    cacheProvider: "true",
    providerOptions,
  });

  const handleConnectWallet = async () => {

    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const funnelContract = new ethers.Contract(
      contractAddress,
      [
        "function makePayment(address payable storeAddress, string[] memory productNames) external payable",
        "function createProduct( address storeAddress, string memory productName, uint256 price ) external",
        "function registerStore(address payable storeAddress) external returns (uint256)"
      ],
      signer
    );

    setAddress(connection.selectedAddress);
    setSigner(signer);
    setProvider(provider);
    setConnected(true);
    setContract(funnelContract);
  };

  const handleDisconnectWallet = async() => {
      const clear = web3modal.clearCachedProvider();
      setConnected(false);
      setAddress("");
  }

  // if(!web3modal.cachedProvider)
  // {
  //   web3modal.connect();
  //   setConnected(true);
  // }

  const web3Data = {
    handleConnectWallet,
    handleDisconnectWallet,
    connected,
    address,
    provider,
    signer,
    contract
  };

  return (
    <Web3Context.Provider value={{ web3Data }}>{children}</Web3Context.Provider>
  );
};
