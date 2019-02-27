import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import { useActionCreators } from "./redux";
import useHttpClient from "../../lib/useHttpClient/useHttpClient";
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
  const { httpGet, httpDelete, httpPost } = useHttpClient();
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

    httpGet(
      url.href,
      r =>
        r
          .json()
          .then((indexVolumes: Array<IndexVolume>) =>
            indexVolumesReceived(indexVolumes)
          ),
      {},
      true
    );
  }, [httpGet]);

  const getIndexVolumeById = useCallback(
    (id: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/${id}`
      );

      httpGet(
        url.href,
        r =>
          r
            .json()
            .then((indexVolume: IndexVolume) =>
              indexVolumeReceived(indexVolume)
            ),
        {},
        true
      );
    },
    [httpGet, indexVolumeReceived]
  );

  const deleteIndexVolume = useCallback(
    (id: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/${id}`
      );

      httpDelete(
        url.href,
        r =>
          r.text().then((indexVolume: IndexVolume) => indexVolumeDeleted(id)),
        {}
      );
    },
    [httpDelete, indexVolumeDeleted]
  );

  const getIndexVolumesInGroup = useCallback(
    (groupName: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/${groupName}`
      );

      httpGet(
        url.href,
        r =>
          r.json().then((indexVolumes: Array<IndexVolume>) => {
            indexVolumesInGroupReceived(groupName, indexVolumes);
          }),
        {},
        true
      );
    },
    [httpGet, indexVolumesInGroupReceived]
  );

  const getGroupsForIndexVolume = useCallback(
    (id: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/groupsFor/${id}`
      );

      httpGet(
        url.href,
        r =>
          r
            .json()
            .then((groups: Array<IndexVolumeGroup>) =>
              indexGroupsForVolumeReceived(id, groups)
            ),
        {},
        true
      );
    },
    [httpGet, indexGroupsForVolumeReceived]
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

      httpPost(
        url.href,
        response =>
          response
            .json()
            .then((indexVolume: IndexVolume) =>
              indexVolumeCreated(indexVolume)
            ),
        { body }
      );
    },
    [httpPost, indexVolumeCreated]
  );

  const addVolumeToGroup = useCallback(
    (indexVolumeId: string, groupName: string) => {
      const state = store.getState();
      const url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/${indexVolumeId}/${groupName}`
      );

      httpPost(url.href, response =>
        response
          .text()
          .then(() => indexVolumeAddedToGroup(indexVolumeId, groupName))
      );
    },
    [httpPost, indexVolumeAddedToGroup]
  );

  const removeVolumeFromGroup = useCallback(
    (indexVolumeId: string, groupName: string) => {
      const state = store.getState();
      const url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/${indexVolumeId}/${groupName}`
      );

      httpDelete(url.href, response =>
        response
          .text()
          .then(() => indexVolumeRemovedFromGroup(indexVolumeId, groupName))
      );
    },
    [httpDelete, indexVolumeRemovedFromGroup]
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
