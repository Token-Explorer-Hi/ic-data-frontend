import { Actor, HttpAgent } from '@dfinity/agent';

const agent = new HttpAgent({
  host: 'https://ic0.app',
});

// SNS Root Canister Interface
const rootIdlFactory = ({ IDL }: { IDL: any }) => {
  return IDL.Service({
    list_sns_canisters: IDL.Func(
      [IDL.Record({})],
      [
        IDL.Record({
          root: IDL.Opt(IDL.Principal),
          swap: IDL.Opt(IDL.Principal),
          ledger: IDL.Opt(IDL.Principal),
          index: IDL.Opt(IDL.Principal),
          governance: IDL.Opt(IDL.Principal),
          dapps: IDL.Vec(IDL.Principal),
          archives: IDL.Vec(IDL.Principal),
        }),
      ],
      ['query'],
    ),
  });
};

// ICRC1 Token Interface
const icrc1IdlFactory = ({ IDL }: { IDL: any }) => {
  return IDL.Service({
    icrc1_symbol: IDL.Func([], [IDL.Text], ['query']),
    icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query']),
    icrc1_total_supply: IDL.Func([], [IDL.Nat], ['query']),
  });
};

export async function getSNSCanisters(rootCanisterId: string): Promise<any> {
  const result = await fetch(
    `https://sns-api.internetcomputer.org/api/v1/snses/${rootCanisterId}`,
  );
  const canisters = await result.json();
  return canisters;
}

export async function getTokenSymbol(
  ledgerCanisterId: string,
): Promise<string | null> {
  const actor = Actor.createActor(icrc1IdlFactory, {
    agent,
    canisterId: ledgerCanisterId,
  });

  try {
    const symbol = await actor.icrc1_symbol();
    return String(symbol);
  } catch (error) {
    console.error('Error getting token symbol:', error);
    return null;
  }
}
export async function getTokenDecimals(
  ledgerCanisterId: string,
): Promise<number | null> {
  const actor = Actor.createActor(icrc1IdlFactory, {
    agent,
    canisterId: ledgerCanisterId,
  });

  try {
    const decimals = await actor.icrc1_decimals();
    console.log('-getTokenDecimals', decimals);
    return Number(decimals);
  } catch (error) {
    console.error('Error getting token decimals:', error);
    return null;
  }
}
export async function getTokenTotalSupply(
  ledgerCanisterId: string,
): Promise<string | null> {
  const actor = Actor.createActor(icrc1IdlFactory, {
    agent,
    canisterId: ledgerCanisterId,
  });

  try {
    const totalSupply = await actor.icrc1_total_supply();
    return String(totalSupply);
  } catch (error) {
    console.error('Error getting token total supply:', error);
    return null;
  }
}
