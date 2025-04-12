import { SubAccount } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";

export function principalToSubHex(principal: string): string {
  const sub = SubAccount.fromPrincipal(Principal.fromText(principal));

  return [...sub.toUint8Array()].reduce((prev, curr) => {
    return prev + curr.toString(16);
  }, "");
}
