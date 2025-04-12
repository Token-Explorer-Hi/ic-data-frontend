export const idlFactory = ({ IDL }) => {
  const Error = IDL.Variant({
    DataSourceNotFound: IDL.Null,
    NotController: IDL.Null,
    NotIndex: IDL.Null,
    NotProvider: IDL.Null,
    CommonError: IDL.Null,
    NotInWhitelist: IDL.Null,
    NotAdmin: IDL.Null,
    BlockNotFound: IDL.Null,
    IndexNotFound: IDL.Null,
    InvalidRequest: IDL.Null,
    InternalError: IDL.Text,
    NotGovernance: IDL.Null,
    StorageNotFound: IDL.Null,
    InsufficientFunds: IDL.Null,
  });
  const Result = IDL.Variant({ ok: IDL.Bool, err: Error });
  const Result_6 = IDL.Variant({
    ok: IDL.Vec(IDL.Principal),
    err: IDL.Text,
  });
  const Result_5 = IDL.Variant({
    ok: IDL.Record({
      governance_canister_id: IDL.Principal,
      index_canister_id: IDL.Principal,
    }),
    err: Error,
  });
  const DefiniteCanisterSettings = IDL.Record({
    freezing_threshold: IDL.Opt(IDL.Nat),
    controllers: IDL.Vec(IDL.Principal),
    reserved_cycles_limit: IDL.Opt(IDL.Nat),
    wasm_memory_limit: IDL.Opt(IDL.Nat),
    memory_allocation: IDL.Opt(IDL.Nat),
    compute_allocation: IDL.Opt(IDL.Nat),
  });
  const CanisterStatusResult = IDL.Record({
    status: IDL.Variant({
      stopped: IDL.Null,
      stopping: IDL.Null,
      running: IDL.Null,
    }),
    memory_size: IDL.Nat,
    cycles: IDL.Nat,
    settings: DefiniteCanisterSettings,
    module_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
    reserved_cycles: IDL.Opt(IDL.Nat),
  });
  const IndexStatusInfo = IDL.Record({
    status: CanisterStatusResult,
    name: IDL.Text,
    canister_id: IDL.Principal,
  });
  const Result_4 = IDL.Variant({ ok: IndexStatusInfo, err: Error });
  const Result_3 = IDL.Variant({
    ok: IDL.Vec(IndexStatusInfo),
    err: Error,
  });
  const StorageStatusInfo = IDL.Record({
    status: CanisterStatusResult,
    month: IDL.Nat,
    canister_id: IDL.Principal,
  });
  const Result_2 = IDL.Variant({ ok: StorageStatusInfo, err: Error });
  const Result_1 = IDL.Variant({
    ok: IDL.Vec(StorageStatusInfo),
    err: Error,
  });
  return IDL.Service({
    add_index_canister: IDL.Func([IDL.Principal, IDL.Text], [Result], []),
    add_storage_canister: IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
    get_admins: IDL.Func([], [Result_6], ['query']),
    get_canister_ids: IDL.Func([], [Result_5], ['query']),
    get_index_canister_status: IDL.Func([IDL.Text], [Result_4], []),
    get_index_canisters_status: IDL.Func([], [Result_3], []),
    get_storage_canister_status: IDL.Func([IDL.Nat], [Result_2], []),
    get_storage_canisters_status: IDL.Func([], [Result_1], []),
    set_admins: IDL.Func([IDL.Vec(IDL.Principal)], [Result], []),
    set_governance_canister: IDL.Func([IDL.Principal], [Result], []),
    set_index_canister: IDL.Func([IDL.Principal], [Result], []),
    topup: IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
