import logo from "./logo.svg";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { SecretNetworkClient, grpc, MsgInstantiateContract,MsgExecuteContract } from "secretjs";
import { Wallet } from "secretjs";
import axios from "axios";
import { useState, CSSProperties } from "react";

import sessionstorage from "sessionstorage";
import sha256 from "sha256";
import { Entropy } from "entropy-string";
import {  GridLoader } from "react-spinners";

const wallet = new Wallet();
const myMnemonicPhrase = wallet.mnemonic;
const grpcWebUrl = "https://grpc.pulsar.scrttestnet.com";
const sSCRT = "secret1ffutl6duh5m6sfj8gz0mxmugm809t9ayz9rtlf";
const sScrtCodeHash ="0xa2e6056c96fbd9378a64a732191a86f137f2170f06d70ea3a6139a58236a36e8";
sessionStorage.setItem("pk",myMnemonicPhrase);
console.log("private key is",sessionStorage.getItem("pk"));
var wlt=new Wallet(sessionstorage.getItem("pk"));
const myAddress = wlt.address;
axios.get("http://54.161.140.130:5000/faucet?to="+myAddress)
.then(function (response) {
console.log("done");
 })
// To create a readonly secret.js client, just pass in a gRPC-web endpoint


function App() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#0000FF");
  async function getdata(email){
    const secretjs = await SecretNetworkClient.create({
      grpcWebUrl,
      chainId: "pulsar-2",
      wallet: wlt,
      walletAddress: myAddress,
    });
  
  
  const result = await secretjs.query.compute.queryContract({
    contractAddress: sSCRT,
    codeHash: sScrtCodeHash, 
    query: {getrecord:{key:email}},
  });
  console.log(result.getrecord.value);
  if(result.getrecord.value=="no data found"){
    instantiate(email)
  }
  else{
    console.log(result.getrecord.value);
    logn(result.getrecord.value,email);
  }
  }
  async function logn(add,email){
    const entropy = new Entropy();
  const vko = entropy.string();
  const secretjs = await SecretNetworkClient.create({
    grpcWebUrl,
    chainId: "pulsar-2",
    wallet: wlt,
    walletAddress: myAddress,
  });
  
    const  map = new MsgExecuteContract({
      sender: myAddress,
      contractAddress: add,
      codeHash:"9561aadefde28d4f0ae974b216bb684224f0d6c1febf09ea1b46510d2b7a9c84",// optional but way faster
  
      msg: {login:{jw:sha256(sessionstorage.getItem("tkn")).toString(),vk:vko}},
    });
    const tx = await secretjs.tx.broadcast([map], {
      gasLimit: 200_000,
    });
    console.log(tx);
    votenkey(email,add,vko);
  
  }
  async function instantiate(email)
  {
    
    const secretjs = await SecretNetworkClient.create({
      grpcWebUrl,
      chainId: "pulsar-2",
      wallet: wlt,
      walletAddress: myAddress,
    }); 
  
    console.log(myAddress);
    var x=await secretjs.query.compute.codeHash(11605);
    console.log(x);
       const tx = await secretjs.tx.compute.instantiateContract(
      {
        sender:myAddress,
        codeId: "11605",
        codeHash:x,
        initMsg: {
          owner:email,
          idtype:"email"
        },     
        label: email,
      },
      {
        gasLimit: 200_000,
      },
    );
   
    const contractAddress = tx.arrayLog.find(
      (log) => log.type === "message" && log.key === "contract_address",
    ).value;
    console.log(contractAddress);
  
   contractmapping(x,email,contractAddress);
  
  }
  async function contractmapping(codeHash,email,contractAddress){
    const secretjs = await SecretNetworkClient.create({
      grpcWebUrl,
      chainId: "pulsar-2",
      wallet: wlt,
      walletAddress: myAddress,
    });
    var ch=secretjs.query.compute.codeHash(11605);
    const  map = new MsgExecuteContract({
      sender: myAddress,
      contractAddress: sSCRT,
      codeHash: sScrtCodeHash, // optional but way faster
      msg: { addrecord: { key:email,value:contractAddress.toString() } },
    });
    const tx = await secretjs.tx.broadcast([map], {
      gasLimit: 200_000,
    });
    console.log(" mapped ");
    let ky=new Wallet();
    
   
    const addkey = new MsgExecuteContract({
      sender: myAddress,
      codeHash:"9561aadefde28d4f0ae974b216bb684224f0d6c1febf09ea1b46510d2b7a9c84",
      contractAddress:contractAddress,
      msg: { addkey:{key:ky.mnemonic.toString(),token:sha256(sessionstorage.getItem("tkn")).toString()}},
    });
    const txo = await secretjs.tx.broadcast([addkey], {
      gasLimit: 200_000,
    });
    console.log(txo);
    console.log("added key");
   
  vote(email);
  }
  function vote(email){
    var counter=0;
    let one = "http://localhost:4200/verify?email="+email+"&token="+sessionstorage.getItem("tkn");
    let two = "http://localhost:4400/verify?email="+email+"&token="+sessionstorage.getItem("tkn");
    let three = "http://localhost:4300/verify?email="+email+"&token="+sessionstorage.getItem("tkn");
     const requestOne = axios.get(one);
     const requestTwo = axios.get(two);
    const requestThree = axios.get(three);
     axios.all([requestOne,requestTwo,requestThree]).then(axios.spread((...responses) => {
       const responseOne = responses[0]
       console.log("key verified");
       setLoading(false);
      
     })).catch(errors => {
       // react on errors.
     })
  }
  async function votenkey(email,add,vko){
    const secretjs = await SecretNetworkClient.create({
      grpcWebUrl,
      chainId: "pulsar-2",
      wallet: wlt,
      walletAddress: myAddress,
    });
   
    let one = "http://localhost:4200/verify?email="+email+"&token="+sessionstorage.getItem("tkn");
  let two = "http://localhost:4400/verify?email="+email+"&token="+sessionstorage.getItem("tkn");
   let three = "http://localhost:4300/verify?email="+email+"&token="+sessionstorage.getItem("tkn");
    const requestOne = axios.get(one);
   const requestTwo = axios.get(two);
   const requestThree = axios.get(three);
    axios.all([requestOne,requestTwo,requestThree]).then(axios.spread((...responses) => {
      const responseOne = responses[0]
      getkey();
      setLoading(false);
    })).catch(errors => {
      // react on errors.
    })
    async function getkey(){
    const result = await secretjs.query.compute.queryContract({
      contractAddress: add,
      codeHash: "9561aadefde28d4f0ae974b216bb684224f0d6c1febf09ea1b46510d2b7a9c84", 
      query: {showkey:{vik:vko}},
    });
    console.log(result.kyy.msg);
    console.log(result.kyy.key);
  }
      
  }
  
  return (
    <>
     {loading?<div className="loadr"><GridLoader color={color} loading={loading} size={30} /></div>:<div>
    <h1>UCPIDKMS</h1>
    <br></br>
    <div className="App" style={{ height: "200vh" }}>

   <br>
    </br>
      <div>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
          <GoogleLogin
            size="large"
            width="200"
            onSuccess={async (credentialResponse) => {
            //  // console.log(credentialResponse);
            setLoading(true);
              const response = await fetch(
                `https://oauth2.googleapis.com/tokeninfo?id_token=${credentialResponse?.credential}`
              );
        // console.log(credentialResponse?.credential);
     
              // 
            const json = await response.json();
            
            console.log(credentialResponse?.credential);
             
            sessionstorage.setItem("tkn",credentialResponse?.credential);
           
                 
            getdata(json.email);
             //  console.log(json.url);
              
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            
          />
        </GoogleOAuthProvider>
      </div>
    </div>
    </div>
          }
    </>
    
  );
}

export default App;
