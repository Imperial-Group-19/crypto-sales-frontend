import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";
import { useSelector, useDispatch } from "react-redux";

import { Navigate } from "react-router-dom";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { loginUser } from "../features/merchantSlice";
import { useWeb3Context } from "../features/Web3Context";

import ConnectButton from "../../components/ConnectButton";

export default function Login() {

// const dispatch = useDispatch();

// const contractAddress = "0xd1a831348b69a37c75540ac3af58b6e37224fe64";


// const providerOptions = {
//     // Injected providers
//     injected: {
//       display: {
//         logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png",
//         name: "Metamask",
//         description: "Connect with the wallet in your browser"
//       },
//       package: null
//     }
// };

// const web3modal = new Web3Modal({
//     network: "mumbai",
//     cacheProvider: "true",
//     providerOptions
// });

// const handleConnectWallet = async()  => {
//     const connection = await web3modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     const signer = provider.getSigner();

//     const funnelContract = new ethers.Contract(
//       contractAddress,
//       ['function makePayment(address payable storeAddress, string[] memory productNames) external payable'],
//       signer
//     )

//     const userState = {
//       walletAddress: connection.selectedAddress,
//       // signer: signer,
//       // provider: provider,
//       funnelContract: funnelContract,
//     }
//     dispatch(loginUser(userState));
// }
  // const handleConnect = () => {
  // }
  const { address } = useWeb3Context();

  console.log(address)
  
  return (
    <>
      <MerchantHeader button="Switch to Register" link="/merchant/register" />
      {address ? ( 
       <Navigate to='/merchant/new-store'/>
       ) : (
      <Container>
        <Row>
          <h1>Login</h1>
        </Row>
        <Row>
          <Col>
                <ConnectButton/>
          </Col>
        </Row>
      </Container>
       )}
    </>
  );
}
