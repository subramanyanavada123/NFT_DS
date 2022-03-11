import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import { MoralisProvider } from "react-moralis";
import { getDefaultProvider } from "ethers";
import { NftProvider, useNft } from "use-nft";

const ethersConfig = {
  provider: getDefaultProvider("homestead"),
};

ReactDOM.render(
  <MoralisProvider
    appId="0wRmfs9whI2CBo9wAQiEiG18u8nZkFZHW5WEXvVe"
    serverUrl="https://zkvmngnc4gmg.usemoralis.com:2053/server"
  >
    
      <App />
  </MoralisProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
