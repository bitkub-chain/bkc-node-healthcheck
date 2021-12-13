#!/bin/bash

curl https://raw.githubusercontent.com/isman-usoh/eth-node-healthcheck/bootnode/eth-bootnode-healthcheck-linux-x64 --output /usr/bin/eth-bootnode-healthcheck-linux-x64
curl https://raw.githubusercontent.com/isman-usoh/eth-node-healthcheck/bootnode/services/eth-bootnode-healthcheck.service --output /etc/systemd/system/eth-bootnode-healthcheck.service
chmod +x /usr/bin/eth-bootnode-healthcheck-linux-x64

systemctl daemon-reload
systemctl enable eth-bootnode-healthcheck.service
systemctl start eth-bootnode-healthcheck.service
systemctl status eth-bootnode-healthcheck.service
