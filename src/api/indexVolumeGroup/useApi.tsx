import useStroomBaseUrl from "../useStroomBaseUrl";
import { useCallback } from "react";

import useHttpClient from "../useHttpClient";
import { IndexVolumeGroup } from "../../types";

interface Api {
  getIndexVolumeGroupNames: () => Promise<Array<string>>;
  getIndexVolumeGroups: () => Promise<Array<IndexVolumeGroup>>;
  getIndexVolumeGroup: (name: string) => Promise<IndexVolumeGroup>;
  createIndexVolumeGroup: (name: string) => Promise<IndexVolumeGroup>;
  deleteIndexVolumeGroup: (name: string) => Promise<void>;
}

export const useApi = (): Api => {
  const stroomBaseServiceUrl = useStroomBaseUrl();
  const {
    httpGetJson,
    httpPostJsonResponse,
    httpDeleteEmptyResponse
  } = useHttpClient();

  const getIndexVolumeGroupNames = useCallback(
    () =>
      httpGetJson(`${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1/names`),
    [stroomBaseServiceUrl, httpGetJson]
  );

  const getIndexVolumeGroups = useCallback(
    () => httpGetJson(`${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1`),
    [stroomBaseServiceUrl, httpGetJson]
  );

  const getIndexVolumeGroup = useCallback(
    (name: string) =>
      httpGetJson(
        `${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1/${name}`
      ),
    [stroomBaseServiceUrl, httpGetJson]
  );

  const createIndexVolumeGroup = useCallback(
    (name: string) =>
      httpPostJsonResponse(
        `${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1/${name}`
      ),
    [stroomBaseServiceUrl, httpPostJsonResponse]
  );

  const deleteIndexVolumeGroup = useCallback(
    (name: string) =>
      httpDeleteEmptyResponse(
        `${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1/${name}`
      ),
    [stroomBaseServiceUrl, httpDeleteEmptyResponse]
  );

  return {
    createIndexVolumeGroup,
    deleteIndexVolumeGroup,
    getIndexVolumeGroup,
    getIndexVolumeGroupNames,
    getIndexVolumeGroups
  };
};

export default useApi;
