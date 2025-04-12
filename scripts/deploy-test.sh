#!/bin/bash

dfx identity use icpswap-test
dfx deploy --network=ic --wallet=$(dfx identity --network=ic get-wallet)
