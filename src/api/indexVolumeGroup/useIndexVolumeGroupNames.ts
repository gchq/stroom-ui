import { useEffect } from "react";

import { useActionCreators } from "./redux";
import useApi from "./useApi";
import useReduxState from "../../lib/useReduxState";

const useIndexVolumeGroupNames = (): Array<string> => {
  const { getIndexVolumeGroupNames } = useApi();
  const { indexVolumeGroupNamesReceived } = useActionCreators();

  useEffect(() => {
    getIndexVolumeGroupNames().then(indexVolumeGroupNamesReceived);
  }, [getIndexVolumeGroupNames]);

  const groupNames = useReduxState(
    ({ indexVolumeGroups: { groupNames } }) => groupNames
  );

  return groupNames;
};

export default useIndexVolumeGroupNames;