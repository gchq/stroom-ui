import { useEffect, useState } from "react";

import useApi from "./useApi";

const useIndexVolumeGroupNames = (): Array<string> => {
  const [groupNames, setGroupNames] = useState<Array<string>>([]);
  const { getIndexVolumeGroupNames } = useApi();

  useEffect(() => {
    getIndexVolumeGroupNames().then(setGroupNames);
  }, [getIndexVolumeGroupNames, setGroupNames]);

  return groupNames;
};

export default useIndexVolumeGroupNames;
