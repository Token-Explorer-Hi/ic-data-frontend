import type { _SERVICE as ICEInfo } from '@/candid/iceInfo';
import { idlFactory as interfaceFactory } from '@/candid/iceInfo.js';
import { useEffect, useMemo, useState } from 'react';
import useActor from './useActor';

export const useICECanister = (canisterId: string) => {
  const actor = useActor<ICEInfo>(
    useMemo(
      () => ({
        canisterId,
        interfaceFactory,
      }),
      [canisterId],
    ),
  );
  const [loadings, setLoadings] = useState<any>({
    index: true,
    storage: true,
  });
  const [indexCanisters, setIndexCanisters] = useState<any>(null);
  const [storageCanisters, setStorageCanisters] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!actor) return;
      const indexCanisters: any = await actor.get_index_canisters_status();
      setIndexCanisters(indexCanisters?.ok ?? '');
      setLoadings((prev: any) => ({ ...prev, index: false }));
    })();
  }, [actor]);
  useEffect(() => {
    (async () => {
      if (!actor) return;
      const storageCanisters: any = await actor.get_storage_canisters_status();
      setStorageCanisters(storageCanisters?.ok ?? '');
      setLoadings((prev: any) => ({ ...prev, storage: false }));
    })();
  }, [actor]);

  return {
    indexCanisters,
    storageCanisters,
    loadings,
  };
};
