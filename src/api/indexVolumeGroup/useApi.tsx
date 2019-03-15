import { useCallback } from "react";

import useHttpClient from "../useHttpClient";
import { IndexVolumeGroup } from "../../types";
import useGetStroomBaseServiceUrl from "../useGetStroomBaseServiceUrl";

interface Api {
  getIndexVolumeGroupNames: () => Promise<Array<string>>;
  getIndexVolumeGroups: () => Promise<Array<IndexVolumeGroup>>;
  getIndexVolumeGroup: (name: string) => Promise<IndexVolumeGroup>;
  createIndexVolumeGroup: (name: string) => Promise<IndexVolumeGroup>;
  deleteIndexVolumeGroup: (name: string) => Promise<void>;
}

export const useApi = (): Api => {
  const getStroomBaseServiceUrl = useGetStroomBaseServiceUrl();
  const {
    httpGetJson,
    httpPostJsonResponse,
    httpDeleteEmptyResponse
  } = useHttpClient();

  return {
    getIndexVolumeGroupNames: useCallback(
      () =>
        httpGetJson(
          `${getStroomBaseServiceUrl()}/stroom-index/volumeGroup/v1/names`
        ),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    getIndexVolumeGroups: useCallback(
      () =>
        httpGetJson(`${getStroomBaseServiceUrl()}/stroom-index/volumeGroup/v1`),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    getIndexVolumeGroup: useCallback(
      (name: string) =>
        httpGetJson(
          `${getStroomBaseServiceUrl()}/stroom-index/volumeGroup/v1/${name}`
        ),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    createIndexVolumeGroup: useCallback(
      (name: string) =>
        httpPostJsonResponse(
          `${getStroomBaseServiceUrl()}/stroom-index/volumeGroup/v1/${name}`
        ),
      [getStroomBaseServiceUrl, httpPostJsonResponse]
    ),
    deleteIndexVolumeGroup: useCallback(
      (name: string) =>
        httpDeleteEmptyResponse(
          `${getStroomBaseServiceUrl()}/stroom-index/volumeGroup/v1/${name}`
        ),
      [getStroomBaseServiceUrl, httpDeleteEmptyResponse]
    )
  };
};

export default useApi;
