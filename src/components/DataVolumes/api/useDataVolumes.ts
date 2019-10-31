import * as React from "react";

import useApi from "./useApi";
import useListReducer from "lib/useListReducer";
import FsVolume from "../types/FsVolume";

/**
 * Convenience function for using Index Volume.
 * This hook connects the REST API calls to the Redux Store.
 */
interface UseDataVolumes {
  volumes: FsVolume[];
  update: (volume: FsVolume) => Promise<FsVolume>;
  createVolume: () => void;
  deleteVolume: (id: string) => void;
  refresh: () => void;
}

const useDataVolumes = (): UseDataVolumes => {
  const { items: volumes, receiveItems, addItem, removeItem } = useListReducer<
    FsVolume
  >(iv => iv.id);

  const { getVolumes, deleteVolume, createVolume, update } = useApi();

  React.useEffect(() => {
    getVolumes().then(receiveItems);
  }, [getVolumes, receiveItems]);

  return {
    volumes,
    createVolume: React.useCallback(
      () => console.log("TODO"),
      // (newIndexVolume: NewIndexVolume) =>
      // createIndexVolume(newIndexVolume).then(addItem),
      [addItem, createVolume],
    ),
    deleteVolume: React.useCallback(
      (id: string) => console.log("TODO"),
      // (id: string) => deleteVolume(id).then(() => removeItem(id)),
      [removeItem, deleteVolume],
    ),
    update: React.useCallback((volume: FsVolume) => update(volume), [update]),
    refresh: React.useCallback(() => getVolumes().then(receiveItems), [
      getVolumes,
      receiveItems,
    ]),
  };
};

export default useDataVolumes;
