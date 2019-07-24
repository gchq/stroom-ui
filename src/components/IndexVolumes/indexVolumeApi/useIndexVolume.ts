import useListReducer from "lib/useListReducer/useListReducer";
import * as React from "react";
import { IndexVolume } from "./types";
import useApi from "./useApi";

interface UseIndexVolume {
  indexVolume: IndexVolume | undefined;
}

const useIndexVolume = (volumeId: string): UseIndexVolume => {
  const [indexVolume, setIndexVolume] = React.useState<IndexVolume | undefined>(
    undefined,
  );
  const {
    items: groupNames,
    addItem,
    removeItem,
    receiveItems,
  } = useListReducer<string>(g => g);

  const {
    getIndexVolumeById,
  } = useApi();

  return { indexVolume };
};

export default useIndexVolume;
