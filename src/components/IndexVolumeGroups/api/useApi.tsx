import * as React from "react";

import useHttpClient from "lib/useHttpClient";
import { useConfig } from "startup/config";
import { IndexVolumeGroup } from "./types";

interface Api {
  getIndexVolumeGroupNames: () => Promise<string[]>;
  getIndexVolumeGroups: () => Promise<IndexVolumeGroup[]>;
  getIndexVolumeGroup: (name: string) => Promise<IndexVolumeGroup>;
  createIndexVolumeGroup: (name: string) => Promise<IndexVolumeGroup>;
  deleteIndexVolumeGroup: (name: string) => Promise<void>;
}

export const useApi = (): Api => {
  const { stroomBaseServiceUrl } = useConfig();
  const {
    httpGetJson,
    httpPostJsonResponse,
    httpDeleteEmptyResponse,
  } = useHttpClient();

  return {
    getIndexVolumeGroupNames: React.useCallback(
      () =>
        httpGetJson(
          `${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1/names`,
        ),
      [stroomBaseServiceUrl, httpGetJson],
    ),
    getIndexVolumeGroups: React.useCallback(
      () => httpGetJson(`${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1`),
      [stroomBaseServiceUrl, httpGetJson],
    ),
    getIndexVolumeGroup: React.useCallback(
      (name: string) =>
        httpGetJson(
          `${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1/${name}`,
        ),
      [stroomBaseServiceUrl, httpGetJson],
    ),
    createIndexVolumeGroup: React.useCallback(
      (name: string) =>
        httpPostJsonResponse(
          `${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1/${name}`,
        ),
      [stroomBaseServiceUrl, httpPostJsonResponse],
    ),
    deleteIndexVolumeGroup: React.useCallback(
      (name: string) =>
        httpDeleteEmptyResponse(
          `${stroomBaseServiceUrl}/stroom-index/volumeGroup/v1/${name}`,
        ),
      [stroomBaseServiceUrl, httpDeleteEmptyResponse],
    ),
  };
};

export default useApi;
