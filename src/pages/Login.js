import React, { useState } from "react";
import Startbar from "./components/Startbar";
import {
  Segment,
  Header,
  Button,
  Icon,
  Card,
  Form,
  Input,
  Message,
  Image,
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { getDefaultProvider, ethers } from "ethers";
import { FetchWrapper } from "use-nft";

function Login(props) {
  const [url, setUrl] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [submit, setSubmit] = useState(false);
  const [meta, setMeta] = useState("");

  const { authenticate, isAuthenticated, user, Moralis, isInitialized } =
    useMoralis();

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async () => {
    const pos = url.indexOf("0x");
    const size = url.length;
    var contract = "";
    var token = "";
    var i = pos;
    console.log(pos);
    console.log(size);
    if (pos === -1) console.log("invalid url");
    else {
      while (1) {
        if (url[i] !== "/") contract += url[i++];
        else break;
      }
      i++;
      while (1) {
        if (i === size) break;
        else token += url[i++];
      }
    }

    console.log(contract);
    console.log(token);

    // const options = { address: contract, token_id: token, chain: "eth" };
    // const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
    //   options
    // );

    // console.log(tokenIdMetadata);

    const fetcher = ["ethers", { provider: ethers.getDefaultProvider() }];

    const fetchWrapper = new FetchWrapper(fetcher);

    const result = await fetchWrapper.fetchNft(contract, token);
    console.log(result);

    fetch(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${contract}&apikey=JDRPICSD8XKEFMCKMTH5ZJNUWNCW7BQQGM`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    setMeta(result);
    setSubmit(true);
  };

  return (
    <div>
      <Startbar type="login" />
      <div className="content">
        <br />
        <Header as="h1">Welcome to NFT Popper</Header>
        <br />
        <div className="leftAlign">
          <Card centered>
            <Card.Content header="Enter OpenSea URL" />
            <Card.Content>
              <Card.Description>
                {!submit && (
                  <Form>
                    <Form.Field>
                      <Image
                        src="https://storage.googleapis.com/opensea-static/Logomark/OpenSea-Full-Logo%20(dark).svg"
                        size="large"
                        centered
                      /><br /><br />

                      <label>Enter the url of the NFT</label>
                      <input
                        placeholder="OpenSea URL"
                        name="url"
                        value={url}
                        onChange={handleChange}
                      />
                    </Form.Field>
                    <Button primary onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Form>
                )}
                {submit && (
                  <div>
                    <Image src={meta.image} size="massive" centered />
                    <Header as="h2" textAlign="center">
                      {meta.name}
                    </Header>
                    <Button primary onClick={() => setSubmit(false)}>
                      Go Back
                    </Button>
                    {/* <Header as="h3" textAlign="center">{meta.description}</Header> */}
                  </div>
                )}
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
