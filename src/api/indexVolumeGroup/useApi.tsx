import { useCallback } from "react";

import useHttpClient from "src/lib/useHttpClient";
import { IndexVolumeGroup } from "src/types";
import { useConfig } from "src/startup/config";

interface Api {
  getIndexVolumeGroupNames: () => Promise<Array<string>>;
  getIndexVolumeGroups: () => Promise<Array<IndexVolumeGroup>>;
  getIndexVolumeGroup: (name: string) => Promise<IndexVolumeGroup>;
  createIndexVolumeGroup: (name: string) => Promise<IndexVolumeGroup>;
  deleteIndexVolumeGroup: (name: string) => Promise<void>;
}

export const useApi = (): Api => {
  const { stroomBaseServiceUrl } = useConfig();
  const {
    httpGetJson,
    httpPostJsonResponse,
    httpDeleteEmptyResponse
  } = useHttpClient();

  return {
    getIndexVolumeGroupNames: useCallback(
      () =>
        httpGetJson(
          `${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1/names`
        ),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    getIndexVolumeGroups: useCallback(
      () => httpGetJson(`${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1`),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    getIndexVolumeGroup: useCallback(
      (name: string) =>
        httpGetJson(
          `${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1/${name}`
        ),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    createIndexVolumeGroup: useCallback(
      (name: string) =>
        httpPostJsonResponse(
          `${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1/${name}`
        ),
      [stroomBaseServiceUrl, httpPostJsonResponse]
    ),
    deleteIndexVolumeGroup: useCallback(
      (name: string) =>
        httpDeleteEmptyResponse(
          `${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1/${name}`
        ),
      [stroomBaseServiceUrl, httpDeleteEmptyResponse]
    )
  };
};

export default useApi;
