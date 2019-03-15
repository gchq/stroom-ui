import { useCallback } from "react";

import useHttpClient from "../useHttpClient";
import { IndexVolume, IndexVolumeGroup } from "../../types";
import useGetStroomBaseServiceUrl from "../useGetStroomBaseServiceUrl";

interface Api {
  getIndexVolumes: () => Promise<Array<IndexVolume>>;
  getIndexVolumeById: (id: string) => Promise<IndexVolume>;
  deleteIndexVolume: (id: string) => Promise<void>;
  getGroupsForIndexVolume: (id: string) => Promise<Array<IndexVolumeGroup>>;
  getIndexVolumesInGroup: (groupName: string) => Promise<Array<IndexVolume>>;
  createIndexVolume: (nodeName: string, path: string) => Promise<IndexVolume>;
  addVolumeToGroup: (indexVolumeId: string, groupName: string) => Promise<void>;
  removeVolumeFromGroup: (
    indexVolumeId: string,
    groupName: string
  ) => Promise<void>;
}

export const useApi = (): Api => {
  const getStroomBaseServiceUrl = useGetStroomBaseServiceUrl();
  const {
    httpGetJson,
    httpDeleteEmptyResponse,
    httpPostJsonResponse,
    httpPostEmptyResponse
  } = useHttpClient();

  return {
    addVolumeToGroup: useCallback(
      (indexVolumeId: string, groupName: string) =>
        httpPostEmptyResponse(
          `${getStroomBaseServiceUrl()}/stroom-index/volume/v1/inGroup/${indexVolumeId}/${groupName}`
        ),
      [getStroomBaseServiceUrl, httpPostEmptyResponse]
    ),
    createIndexVolume: useCallback(
      (nodeName: string, path: string) =>
        httpPostJsonResponse(
          `${getStroomBaseServiceUrl()}/stroom-index/volume/v1/${name}`,
          { body: JSON.stringify({ nodeName, path }) }
        ),
      [getStroomBaseServiceUrl, httpPostJsonResponse]
    ),
    deleteIndexVolume: useCallback(
      (id: string) =>
        httpDeleteEmptyResponse(
          `${getStroomBaseServiceUrl()}/stroom-index/volume/v1/${id}`
        ),
      [getStroomBaseServiceUrl, httpDeleteEmptyResponse]
    ),
    getIndexVolumeById: useCallback(
      (id: string) =>
        httpGetJson(
          `${getStroomBaseServiceUrl()}/stroom-index/volume/v1/${id}`
        ),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    getIndexVolumes: useCallback(
      () => httpGetJson(`${getStroomBaseServiceUrl()}/stroom-index/volume/v1`),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    getIndexVolumesInGroup: useCallback(
      (groupName: string) =>
        httpGetJson(
          `${getStroomBaseServiceUrl()}/stroom-index/volume/v1/inGroup/${groupName}`
        ),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    removeVolumeFromGroup: useCallback(
      (indexVolumeId: string, groupName: string) =>
        httpDeleteEmptyResponse(
          `${getStroomBaseServiceUrl()}/stroom-index/volume/v1/inGroup/${indexVolumeId}/${groupName}`
        ),
      [getStroomBaseServiceUrl, httpDeleteEmptyResponse]
    ),
    getGroupsForIndexVolume: useCallback(
      (id: string) =>
        httpGetJson(
          `${getStroomBaseServiceUrl()}/stroom-index/volume/v1/groupsFor/${id}`
        ),
      [getStroomBaseServiceUrl, httpGetJson]
    )
  };
};

export default useApi;
