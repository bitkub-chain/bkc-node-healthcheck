FROM node:16-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

ENV RPC_URL=http://localhost:8545
ENV NETWORK_URLS=https://rpc.bitkubchain.io
ENV PORT=80

EXPOSE 80
CMD ["npm","start"]