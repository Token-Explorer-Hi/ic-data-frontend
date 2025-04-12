import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';
import type { Principal } from '@dfinity/principal';

export interface CanisterStatusResult {
  status: { stopped: null } | { stopping: null } | { running: null };
  memory_size: bigint;
  cycles: bigint;
  settings: DefiniteCanisterSettings;
  module_hash: [] | [Uint8Array | number[]];
  reserved_cycles: [] | [bigint];
}
export interface DefiniteCanisterSettings {
  freezing_threshold: [] | [bigint];
  controllers: Array<Principal>;
  reserved_cycles_limit: [] | [bigint];
  wasm_memory_limit: [] | [bigint];
  memory_allocation: [] | [bigint];
  compute_allocation: [] | [bigint];
}
export type Error =
  | { DataSourceNotFound: null }
  | { NotController: null }
  | { NotIndex: null }
  | { NotProvider: null }
  | { CommonError: null }
  | { NotInWhitelist: null }
  | { NotAdmin: null }
  | { BlockNotFound: null }
  | { IndexNotFound: null }
  | { InvalidRequest: null }
  | { InternalError: string }
  | { NotGovernance: null }
  | { StorageNotFound: null }
  | { InsufficientFunds: null };
export interface IndexStatusInfo {
  status: CanisterStatusResult;
  name: string;
  canister_id: Principal;
}
export type Result = { ok: boolean } | { err: Error };
export type Result_1 = { ok: Array<StorageStatusInfo> } | { err: Error };
export type Result_2 = { ok: StorageStatusInfo } | { err: Error };
export type Result_3 = { ok: Array<IndexStatusInfo> } | { err: Error };
export type Result_4 = { ok: IndexStatusInfo } | { err: Error };
export type Result_5 =
  | {
      ok: {
        governance_canister_id: Principal;
        index_canister_id: Principal;
      };
    }
  | { err: Error };
export type Result_6 = { ok: Array<Principal> } | { err: string };
export interface StorageStatusInfo {
  status: CanisterStatusResult;
  month: bigint;
  canister_id: Principal;
}
export interface _SERVICE {
  add_index_canister: ActorMethod<[Principal, string], Result>;
  add_storage_canister: ActorMethod<[Principal, bigint], Result>;
  get_admins: ActorMethod<[], Result_6>;
  get_canister_ids: ActorMethod<[], Result_5>;
  get_index_canister_status: ActorMethod<[string], Result_4>;
  get_index_canisters_status: ActorMethod<[], Result_3>;
  get_storage_canister_status: ActorMethod<[bigint], Result_2>;
  get_storage_canisters_status: ActorMethod<[], Result_1>;
  set_admins: ActorMethod<[Array<Principal>], Result>;
  set_governance_canister: ActorMethod<[Principal], Result>;
  set_index_canister: ActorMethod<[Principal], Result>;
  topup: ActorMethod<[Principal, bigint], Result>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
