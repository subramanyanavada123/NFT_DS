import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import { getDefaultProvider } from "ethers";
import Dashboard from "./pages/Dashboard";
import { NftProvider, useNft } from "use-nft";

const ethersConfig = {
  provider: getDefaultProvider("homestead"),
};

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <NftProvider fetcher={["ethers", ethersConfig]}>
            <Route path="/" component={Login} />
          </NftProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
