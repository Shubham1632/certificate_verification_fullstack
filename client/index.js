import { ethers } from "./ethers_lib.js";
import { abi, contractAddress } from "./constants.js";

const connectbtn = document.getElementById("connectBtn");
connectbtn.onclick = connect;

const storebtn = document.getElementById("storeBtn");
storebtn.onclick = store;

const getdata = document.getElementById("getdata");
getdata.onclick = validate;

const storeresponce = document.getElementById("storeinfo");
const getdataresponce = document.getElementById("getinfo");

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("connected");
    connectbtn.innerHTML = "Connected";
  } else {
    connectbtn.innerHTML = "Install metamask";
  }
}

async function getcontract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
}

async function store() {
  //   await console.log("working");
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const event = document.getElementById("event").value;
  const duration = document.getElementById("duration").value;
  const contract = await getcontract();
  const responce = await contract.store(id, name, event, duration);
  await responce.wait(1);
  console.log(responce);
  storeresponce.innerHTML = `The information is sucssesfully stored bt id: ${id}`;
}

async function validate() {
  const id = document.getElementById("validate").value;
  const contract = await getcontract();
  const data = await contract.retrive(id);
  console.log(
    `Name = ${data.name}, Event= ${data.subject}, position = ${data.duration}`
  );
  getdataresponce.innerHTML = `Info: Name = ${data.name}, Event= ${data.subject}, position = ${data.duration}`;
}
