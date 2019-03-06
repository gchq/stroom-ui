import { useEffect } from "react";

import useApi from "./useApi";
import useReduxState from "../../lib/useReduxState";

export default (): Array<string> => {
  const { getIndexVolumeGroupNames } = useApi();
  useEffect(() => {
    getIndexVolumeGroupNames();
  }, [getIndexVolumeGroupNames]);

  const groupNames = useReduxState(
    ({ indexVolumeGroups: { groupNames } }) => groupNames
  );

  return groupNames;
};
