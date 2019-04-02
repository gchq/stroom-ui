import { useEffect, useState } from "react";

import useApi from "./useApi";

const useIndexVolumeGroupNames = (): string[] => {
  const [groupNames, setGroupNames] = useState<string[]>([]);
  const { getIndexVolumeGroupNames } = useApi();

  useEffect(() => {
    getIndexVolumeGroupNames().then(setGroupNames);
  }, [getIndexVolumeGroupNames, setGroupNames]);

  return groupNames;
};

export default useIndexVolumeGroupNames;
