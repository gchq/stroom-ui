import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import { useActionCreators } from "./redux";
import useHttpClient from "../useHttpClient";
import { IndexVolume, IndexVolumeGroup } from "../../types";

export interface Api {
  getIndexVolumes: () => void;
  getIndexVolumeById: (id: string) => void;
  deleteIndexVolume: (id: string) => void;
  getGroupsForIndexVolume: (id: string) => void;
  getIndexVolumesInGroup: (groupName: string) => void;
  createIndexVolume: (nodeName: string, path: string) => void;
  addVolumeToGroup: (indexVolumeId: string, groupName: string) => void;
  removeVolumeFromGroup: (indexVolumeId: string, groupName: string) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const {
    httpGetJson,
    httpDeleteEmptyResponse,
    httpPostJsonResponse,
    httpPostEmptyResponse
  } = useHttpClient();
  const {
    indexVolumesReceived,
    indexVolumeReceived,
    indexVolumeDeleted,
    indexVolumesInGroupReceived,
    indexGroupsForVolumeReceived,
    indexVolumeCreated,
    indexVolumeAddedToGroup,
    indexVolumeRemovedFromGroup
  } = useActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const getIndexVolumes = useCallback(() => {
    const state = store.getState();
    var url = new URL(
      `${state.config.values.stroomBaseServiceUrl}/stroom-index/volume/v1`
    );

    httpGetJson(url.href).then(indexVolumesReceived);
  }, [httpGetJson]);

  const getIndexVolumeById = useCallback(
    (id: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/${id}`
      );
      httpGetJson(url.href).then(indexVolumeReceived);
    },
    [httpGetJson, indexVolumeReceived]
  );

  const deleteIndexVolume = useCallback(
    (id: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/${id}`
      );

      httpDeleteEmptyResponse(url.href).then(() => indexVolumeDeleted(id));
    },
    [httpDeleteEmptyResponse, indexVolumeDeleted]
  );

  const getIndexVolumesInGroup = useCallback(
    (groupName: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/${groupName}`
      );

      httpGetJson(url.href, {}, true).then((i: Array<IndexVolume>) => {
        indexVolumesInGroupReceived(groupName, i);
      });
    },
    [httpGetJson, indexVolumesInGroupReceived]
  );

  const getGroupsForIndexVolume = useCallback(
    (id: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/groupsFor/${id}`
      );

      httpGetJson(url.href, {}, true).then((groups: Array<IndexVolumeGroup>) =>
        indexGroupsForVolumeReceived(id, groups)
      );
    },
    [httpGetJson, indexGroupsForVolumeReceived]
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

      httpPostJsonResponse(url.href, { body }).then(indexVolumeCreated);
    },
    [httpPostJsonResponse, indexVolumeCreated]
  );

  const addVolumeToGroup = useCallback(
    (indexVolumeId: string, groupName: string) => {
      const state = store.getState();
      const url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/${indexVolumeId}/${groupName}`
      );

      httpPostEmptyResponse(url.href).then(() =>
        indexVolumeAddedToGroup(indexVolumeId, groupName)
      );
    },
    [httpPostEmptyResponse, indexVolumeAddedToGroup]
  );

  const removeVolumeFromGroup = useCallback(
    (indexVolumeId: string, groupName: string) => {
      const state = store.getState();
      const url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/${indexVolumeId}/${groupName}`
      );

      httpDeleteEmptyResponse(url.href).then(() =>
        indexVolumeRemovedFromGroup(indexVolumeId, groupName)
      );
    },
    [httpDeleteEmptyResponse, indexVolumeRemovedFromGroup]
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
