# eth-node-healthcheck

Little http node.js server to run along the ethereum node. Node needs to have JSONRPC enabled. Returns **503 Service Unavailable** if the last block number on the local node is off by 3 or more blocks from the last block number from Infura node. Otherwise returns **200 OK**.

Supported networks:


## Installation

```
npm install -g eth-node-healthcheck
```

## Run

Configuration parameters (set as ENV variables):

- RPC_URL — hostname where your node JSON RPC is running. Default: `http://localhost:8545`

- NETWORK_URLS — network public JSON RPC

- PORT — port to run this service on

Example for mainnet:
```
RPC_URL=http://localhost:8545 NETWORK_URLS=http://rpc.bitkubchain.io PORT=50336 bkc-node-healthcheck
```

Make sure the process is detached from the terminal. Make sure the port is open for incoming connections.

## License

MIT