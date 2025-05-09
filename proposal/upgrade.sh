NEURON_ID="4c6562eea00d4388de5988df87f14d6df99ffd63f3eaba7b1a66e071107ae2e3"
WASM_PATH="../.dfx/ic/canisters/interface/interface.wasm.gz"
TARGET_CANISTER_ID="sitc5-eiaaa-aaaal-qjnna-cai"
PEM_FILE="$HOME/.config/dfx/identity/$(dfx identity whoami)/wallet.pem"
CANISTER_IDS_FILE="./sns_canister_ids.json"
SUMMARY="$(cat ./summary.md)"


dfx identity use ic-explorer
quill sns make-upgrade-canister-proposal \
    --title "Proposal to Upgrade Frontend Canister" \
    --summary "$SUMMARY" \
    --target-canister-id $TARGET_CANISTER_ID \
    --wasm-path "$WASM_PATH" \
    $NEURON_ID \
    --mode upgrade \
    --canister-ids-file "$CANISTER_IDS_FILE" \
    --pem-file "$PEM_FILE" > message.json

quill send message.json