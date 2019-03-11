import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import useHttpClient from "../useHttpClient";
import { IndexVolume, IndexVolumeGroup } from "../../types";

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
  const store = useContext(StoreContext);
  const {
    httpGetJson,
    httpDeleteEmptyResponse,
    httpPostJsonResponse,
    httpPostEmptyResponse
  } = useHttpClient();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const getIndexVolumes = useCallback(() => {
    const state = store.getState();
    var url = new URL(
      `${state.config.values.stroomBaseServiceUrl}/stroom-index/volume/v1`
    );

    return httpGetJson(url.href);
  }, [httpGetJson]);

  const getIndexVolumeById = useCallback(
    (id: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/${id}`
      );
      return httpGetJson(url.href);
    },
    [httpGetJson]
  );

  const deleteIndexVolume = useCallback(
    (id: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/${id}`
      );

      return httpDeleteEmptyResponse(url.href);
    },
    [httpDeleteEmptyResponse]
  );

  const getIndexVolumesInGroup = useCallback(
    (groupName: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/${groupName}`
      );

      return httpGetJson(url.href);
    },
    [httpGetJson]
  );

  const getGroupsForIndexVolume = useCallback(
    (id: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/groupsFor/${id}`
      );

      return httpGetJson(url.href);
    },
    [httpGetJson]
  );

  const createIndexVolume = useCallback(
    (nodeName: string, path: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/${name}`
      );

      const body = JSON.stringify({ nodeName, path });

      return httpPostJsonResponse(url.href, { body });
    },
    [httpPostJsonResponse]
  );

  const addVolumeToGroup = useCallback(
    (indexVolumeId: string, groupName: string) => {
      const state = store.getState();
      const url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/${indexVolumeId}/${groupName}`
      );

      return httpPostEmptyResponse(url.href);
    },
    [httpPostEmptyResponse]
  );

  const removeVolumeFromGroup = useCallback(
    (indexVolumeId: string, groupName: string) => {
      const state = store.getState();
      const url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/${indexVolumeId}/${groupName}`
      );

      return httpDeleteEmptyResponse(url.href);
    },
    [httpDeleteEmptyResponse]
  );

  return {
    addVolumeToGroup,
    createIndexVolume,
    deleteIndexVolume,
    getIndexVolumeById,
    getIndexVolumes,
    getIndexVolumesInGroup,
    removeVolumeFromGroup,
    getGroupsForIndexVolume
  };
};

export default useApi;
