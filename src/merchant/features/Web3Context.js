import { React, useContext, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const Web3Context = React.createContext();

export const useWeb3Context = () => {
  return useContext(Web3Context);
}

export const Web3ContextProvider = children => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();


  const contractAddress = "0xd1a831348b69a37c75540ac3af58b6e37224fe64";


  const providerOptions = {
      // Injected providers
      injected: {
        display: {
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png",
          name: "Metamask",
          description: "Connect with the wallet in your browser"
        },
        package: null
      }
  };

  const web3modal = new Web3Modal({
      network: "mumbai",
      cacheProvider: "true",
      providerOptions
  });

  const handleConnectWallet = async()  => {
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const funnelContract = new ethers.Contract(
        contractAddress,
        ['function makePayment(address payable storeAddress, string[] memory productNames) external payable'],
        signer
      )

      setAddress(connection.selectedAddress);
      setSigner(signer)
      setProvider(provider);
      setConnected(true);
      setContract(contract);
  }
  const web3Data = {
    handleConnectWallet,
    connected,
    address,
    provider,
    signer,
    contract
  }

  return <Web3Context.Provider value ={web3Data}></Web3Context.Provider>
}