#!/usr/bin/env node

const ethers = require('ethers');
const http = require('http');

const port = process.env.PORT || 80
const localRpcUrl = process.env.RPC_URL || 'http://localhost:8545';
const networkRpcUrls = (process.env.NETWORK_URLS || 'https://rpc.bitkubchain.io').split(',')

const MAX_BLOCK_DIFFERENCE = process.env.MAX_BLOCK_DIFFERENCE || 3;

const getNetworkBlockNum = async (rpcUrl) => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  return provider.getBlockNumber();
}

const ramdomBetween = (min, max) => {  
  return Math.floor(Math.random() * (max - min) + min)
}

const onHealthcheckRequest = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  let localBlockNum;
  let networkBlockNum;
  const networkRpcIndex = ramdomBetween(0, networkRpcUrls.length)
  const networkRpcUrl = networkRpcUrls[networkRpcIndex]

  try {
    networkBlockNum = await getNetworkBlockNum(networkRpcUrl)
  } catch (error) {
    console.log(`Fetch network ${networks[networkIndex]}, error: Cannot connect network.`)
    console.error(e);
    networkBlockNum = 0;
  }

  try {
    localBlockNum = await getNetworkBlockNum(localRpcUrl)
  } catch (e) {
    console.log(`Fetch local ${networkRpcUrl}, error: Cannot connect local.`)
    console.error(e);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(e);
    return;
  }

  console.log(`Fetch network ${networkRpcUrl} -> local ${localRpcUrl}, last block: ${networkBlockNum} --> ${localBlockNum}`)

  let responseStatus = networkBlockNum - localBlockNum > MAX_BLOCK_DIFFERENCE ? 500 : 200;
  if (localBlockNum > 10000 && networkBlockNum <= 0) { // don't let etherscan f**k us
    responseStatus = 200;
  } else if (networkBlockNum < localBlockNum) {
    responseStatus = 200;
  }
  res.writeHead(responseStatus, { 'Content-Type': 'text/plain' });
  res.end((localBlockNum - networkBlockNum).toString());
};

http.createServer(onHealthcheckRequest)
  .listen(port, () => {
    console.log(`Start port ${port}`);
  });
