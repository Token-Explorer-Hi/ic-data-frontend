import { principalToAccount } from "./principalToAccount";

export function explorerLink(id: string) {
  if (id.length > 27) {
    if (id.includes("-")) {
      const account = principalToAccount(id);
      return `https://dashboard.internetcomputer.org/account/${account}`;
    } 
      return `https://dashboard.internetcomputer.org/account/${id}`;
    
  }

  return `https://dashboard.internetcomputer.org/canister/${id}`;
}
