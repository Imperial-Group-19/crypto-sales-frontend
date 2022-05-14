import React, { createContext } from 'react'
import io from 'socket.io-client';

import { useDispatch } from 'react-redux';
import { loadStores } from "./merchant/features/merchantSlice";
import { loadProducts } from "./features/shopSlice";

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }) => {
  let socket;
  let ws;

  // Dispatch for redux
  const dispatch = useDispatch();

  // Set subscription type
  const apiCall = {
    id: 0,
    jsonrpc: "2.0",
    method: "subscribe",
    params: ["products", "stores"],
  };

  if (!socket) {
    socket = io.connect("ws://127.0.0.1:5000")

    // send subscription
    socket.emit("event://send-message", JSON.stringify(apiCall))

    socket.on("event://get-message", (msg) => {
      const payload = JSON.parse(msg);
      console.log(payload);
    })
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )

  // // Send subscription type for initial handshake
  // client.onopen = () => {
  //   console.log("WebSocket Client Connected");
  //   client.send(JSON.stringify(apiCall));
  // };
  //
  // // Handle incoming data from backend (update state)
  // client.onmessage = (event) => {
  //   const u8intarray = new Uint8Array(event.data);
  //   const string = new TextDecoder().decode(u8intarray);
  //   const data = JSON.parse(string);
  //   console.log(data);
  //
  //   if (data.params) {
  //     if (data.params[0] === "products") {
  //       let products = data.params[1];
  //       console.log(products);
  //       dispatch(loadProducts(products));
  //     }
  //     if (data.params[0] === "stores") {
  //       let stores = data.params[1];
  //       console.log(stores);
  //       dispatch(loadStores(stores));
  //     }
  //   }
  // };
}
