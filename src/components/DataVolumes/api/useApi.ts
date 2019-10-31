import * as React from "react";

import useHttpClient from "lib/useHttpClient";
import useConfig from "startup/config/useConfig";
import FsVolume from "../types/FsVolume";

interface Api {
  update: (volume: FsVolume) => Promise<FsVolume>;
  getVolumes: () => Promise<FsVolume[]>;
  getVolumeById: (id: string) => Promise<FsVolume>;
  deleteVolume: (id: string) => Promise<void>;
  createVolume: () => Promise<FsVolume>;
}

export const useApi = (): Api => {
  const { stroomBaseServiceUrl } = useConfig();
  const {
    httpGetJson,
    httpDeleteEmptyResponse,
    httpPostJsonResponse,
    httpPutJsonResponse,
  } = useHttpClient();

  return {
    createVolume: React.useCallback(
      () =>
        httpPostJsonResponse(
          `${stroomBaseServiceUrl}/stroom-index/volume/v1/`,
          { body: JSON.stringify({ todo: "TODO" }) },
        ),
      [stroomBaseServiceUrl, httpPostJsonResponse],
    ),
    deleteVolume: React.useCallback(
      (id: string) =>
        httpDeleteEmptyResponse(
          `${stroomBaseServiceUrl}/stroom-index/volume/v1/${id}`,
        ),
      [stroomBaseServiceUrl, httpDeleteEmptyResponse],
    ),
    getVolumeById: React.useCallback(
      (id: string) =>
        httpGetJson(`${stroomBaseServiceUrl}/stroom-index/volume/v1/${id}`),
      [stroomBaseServiceUrl, httpGetJson],
    ),
    getVolumes: React.useCallback(
      () => httpGetJson(`${stroomBaseServiceUrl}/stroom-index/volume/v1`),
      [stroomBaseServiceUrl, httpGetJson],
    ),
    update: React.useCallback(
      (volume: FsVolume) =>
        httpPutJsonResponse(`${stroomBaseServiceUrl}/stroom-index/volume/v1`, {
          body: JSON.stringify(volume),
        }),
      [stroomBaseServiceUrl, httpPutJsonResponse],
    ),
  };
};

export default useApi;
