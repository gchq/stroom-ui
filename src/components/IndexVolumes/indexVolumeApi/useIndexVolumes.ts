import * as React from "react";

import useApi from "./useApi";
import { IndexVolume, NewIndexVolume } from "./types";
import useListReducer from "lib/useListReducer";

/**
 * Convenience function for using Index Volume.
 * This hook connects the REST API calls to the Redux Store.
 */
interface UseIndexVolumes {
  indexVolumes: IndexVolume[];
  update: (indexVolume: IndexVolume) => Promise<void>;
  createIndexVolume: (newIndexVolume: NewIndexVolume) => void;
  deleteIndexVolume: (id: string) => void;
}

const useIndexVolumes = (): UseIndexVolumes => {
  const {
    items: indexVolumes,
    receiveItems,
    addItem,
    removeItem,
    updateItemAtIndex,
  } = useListReducer<IndexVolume>(iv => iv.id);

  const {
    getIndexVolumes,
    deleteIndexVolume,
    createIndexVolume,
    update,
  } = useApi();

  React.useEffect(() => {
    getIndexVolumes().then(receiveItems);
  }, [getIndexVolumes, receiveItems]);

  return {
    indexVolumes,
    createIndexVolume: React.useCallback(
      (newIndexVolume: NewIndexVolume) =>
        createIndexVolume(newIndexVolume).then(addItem),
      [addItem, createIndexVolume],
    ),
    deleteIndexVolume: React.useCallback(
      (id: string) => deleteIndexVolume(id).then(() => removeItem(id)),
      [removeItem, deleteIndexVolume],
    ),
    update: React.useCallback(
      (indexVolume: IndexVolume) =>
        update({
          id: indexVolume.id,
          indexVolumeGroupId: indexVolume.indexVolumeGroupId,
          path: indexVolume.path,
          nodeName: indexVolume.nodeName,
        }).then(response => {
          updateItemAtIndex(
            indexVolumes.findIndex(iv => iv.id === indexVolume.id),
            response,
          );
        }),
      [update, updateItemAtIndex, indexVolumes],
    ),
  };
};

export default useIndexVolumes;
