#!/usr/bin/env node

const Web3 = require('web3')
const http = require('http');

const port = process.env.PORT || 80
const url = process.env.RPC_URL || 'http://localhost:8545';

const web3 = new Web3(url);

const onHealthcheckRequest = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  let responseStatus = 200
  let isSyncing
  try {
    isSyncing = await web3.eth.isSyncing()
    if (isSyncing) {
      responseStatus = 500;
    }
  } catch (error) {
    console.log(`Fetch local ${url}, error: Cannot connect local.`)
    console.error(e);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(e);
    return;
  }
  res.writeHead(responseStatus, { 'Content-Type': 'text/plain' });
  res.end(JSON.stringify(isSyncing));
};

http.createServer(onHealthcheckRequest)
  .listen(port, () => {
    console.log(`Start port ${port}`);
  });
