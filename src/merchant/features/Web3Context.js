import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
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

  const contractAddress = "0xEC21fd26fcB7F61cbeF9038BA7E59AF60C13e77c";

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

  const initListener = useCallback(
    (rawProvider) => {
      if (!rawProvider.on) {
        return;
      }
      rawProvider.on("accountsChanged", async (accounts) => {
        setTimeout(() => window.location.reload(), 1);
      });
    },
    [provider]
  );

  const web3modal = new Web3Modal({
    network: "mumbai",
    cacheProvider: "true",
    providerOptions,
  });

  const handleConnectWallet = async (checkout = false) => {
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    initListener(connection);

    const { chainId } = await provider.getNetwork();

    if (chainId != 80001) {
      switchNetwork();
    }

    console.log(chainId);

    const funnelContract = new ethers.Contract(
      contractAddress,
      [
        "function makePayment(address payable storeAddress, string[] memory productNames) external payable",
        "function createProduct( address storeAddress, string memory productName, uint8 productType, uint256 price ) external",
        "function registerStore(address payable storeAddress, uint256 commisionRate) external returns (uint256)",
        "function updateProductPrice(address storeAddress, string memory productName, uint256 price ) external",
      ],
      signer
    );

    setAddress(connection.selectedAddress);
    setSigner(signer);
    setProvider(provider);
    setConnected(true);
    setContract(funnelContract);
  };

  const switchNetwork = async () => {
    console.log("switching network");
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881",
                chainName: "Mumbai",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
              },
            ],
          });
        } catch (addError) {
          throw addError;
        }
      }
    }
  };

  const handleDisconnectWallet = async () => {
    const clear = web3modal.clearCachedProvider();
    setConnected(false);
    setAddress("");
  };

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
    contract,
  };

  return (
    <Web3Context.Provider value={{ web3Data }}>{children}</Web3Context.Provider>
  );
};
