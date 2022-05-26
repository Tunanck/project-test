import { ethers, Wallet } from "ethers";
import {
  Web3Provider,
  JsonRpcSigner,
  JsonRpcProvider,
} from "@ethersproject/providers";
import { useEffect, useState } from "react";

import { KUSDCToken__factory } from "./typechain/factories/KUSDCToken__factory";
import { KUSDCToken } from "./typechain/KUSDCToken";
import { formatEther } from "ethers/lib/utils";
import { ERC20, ERC20__factory } from "./typechain";

let provider: Web3Provider | JsonRpcProvider;
let signer: JsonRpcSigner | Wallet;
let tokenAddress = "0x8669B7902dBEbC63E4cD3E09adf99DcAef14DC64";

function App() {
  const [address, setAddress] = useState(
    "0x6fB64e9e86Ac1C72bA181b49F87c8cFdF462bA1b"
  );
  const [balance, setBalance] = useState("");
  const [token, setToken] = useState("");

  async function voteToken() {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();

      const tokenContract = ERC20__factory.connect(tokenAddress, signer)as ERC20

      // const tokenContract = new ethers.Contract(
      //   token,
      //   KUSDCToken__factory.abi,
      //   signer
      // ) as ERC20;

      setToken(await tokenContract.symbol())

      console.log(typeof(await tokenContract.symbol()), "test");

      const vote = await tokenContract.balanceOf(
        "0x6fB64e9e86Ac1C72bA181b49F87c8cFdF462bA1b"
      );

      console.log(vote);

      const getBalance = await tokenContract.balanceOf(address);

      const setNewBalance = formatEther(getBalance);

      setBalance(setNewBalance);

      console.log(balance);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    voteToken();
    
  }, [voteToken]);

  // async function getMint() {
  //   const voteTokenContract = new ethers.Contract(
  //     token,
  //     VoteToken__factory.abi,
  //     signer
  //   ) as VoteToken;

  //   const _mint = await voteTokenContract.mint(addressMint, 1);
  //   console.log(_mint);
  //   await _mint.wait();
  //   setLoding("Success!!");

  //   const getBalance = voteTokenContract.filters.Transfer(
  //     null,
  //     addressMint,
  //     null
  //   );

  //   voteTokenContract.on(getBalance, async (from, to, value) => {
  //     console.log(from, to, value.toString(), "getBalance");
  //     setBalance(await (await voteTokenContract.balanceOf(address)).toString());
  //   });

  //   const testlog = await voteTokenContract.filters.TestLog();

  //   voteTokenContract.on(testlog, (e) => {
  //     console.log("From");
  //     console.log(e);
  //   });
  // }

  return (
    <div>
      <div>
        {/* <input type="text" onChange={(e) => setAddress(e.target.value)} /> */}
      </div>
      <p>
        <div>{token} : {balance}</div>
        {/* <button onClick={() => voteToken()}>wallet</button> */}
      </p>
      <div>
        {/* AddressMint :
        <input
          type="text"
          onChange={(e) => setAddressMint(e.target.value)}
        />{" "} */}
        {/* <button onClick={() => getMint()}>Mint</button> {loding} */}
      </div>
    </div>
  );
}

export default App;
