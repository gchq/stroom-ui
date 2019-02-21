import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import { actionCreators } from "./redux";
import useHttpClient from "../../lib/useHttpClient/useHttpClient";
import { IndexVolume, IndexVolumeGroup } from "../../types";

const {
  indexVolumesReceived,
  indexVolumeReceived,
  indexVolumesInGroupReceived,
  indexGroupsForVolumeReceived,
  indexVolumeCreated,
  indexVolumeDeleted,
  indexVolumeAddedToGroup,
  indexVolumeRemovedFromGroup
} = actionCreators;

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
  const httpClient = useHttpClient();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const getIndexVolumes = useCallback(() => {
    const state = store.getState();
    var url = new URL(
      `${state.config.values.stroomBaseServiceUrl}/stroom-index/volume/v1`
    );

    httpClient.httpGet(
      url.href,
      r =>
        r
          .json()
          .then((indexVolumes: Array<IndexVolume>) =>
            store.dispatch(indexVolumesReceived(indexVolumes))
          ),
      {},
      true
    );
  }, []);

  const getIndexVolumeById = useCallback((id: string) => {
    const state = store.getState();
    var url = new URL(
      `${state.config.values.stroomBaseServiceUrl}/stroom-index/volume/v1/${id}`
    );

    httpClient.httpGet(
      url.href,
      r =>
        r
          .json()
          .then((indexVolume: IndexVolume) =>
            store.dispatch(indexVolumeReceived(indexVolume))
          ),
      {},
      true
    );
  }, []);

  const deleteIndexVolume = useCallback((id: string) => {
    const state = store.getState();
    var url = new URL(
      `${state.config.values.stroomBaseServiceUrl}/stroom-index/volume/v1/${id}`
    );

    httpClient.httpDelete(
      url.href,
      r =>
        r
          .text()
          .then((indexVolume: IndexVolume) =>
            store.dispatch(indexVolumeDeleted(id))
          ),
      {}
    );
  }, []);

  const getIndexVolumesInGroup = useCallback((groupName: string) => {
    const state = store.getState();
    var url = new URL(
      `${
        state.config.values.stroomBaseServiceUrl
      }/stroom-index/volume/v1/inGroup/${groupName}`
    );

    httpClient.httpGet(
      url.href,
      r =>
        r
          .json()
          .then((indexVolumes: Array<IndexVolume>) =>
            store.dispatch(indexVolumesInGroupReceived(groupName, indexVolumes))
          ),
      {},
      true
    );
  }, []);

  const getGroupsForIndexVolume = useCallback((id: string) => {
    const state = store.getState();
    var url = new URL(
      `${
        state.config.values.stroomBaseServiceUrl
      }/stroom-index/volume/v1/groupsFor/${id}`
    );

    httpClient.httpGet(
      url.href,
      r =>
        r
          .json()
          .then((groups: Array<IndexVolumeGroup>) =>
            store.dispatch(indexGroupsForVolumeReceived(id, groups))
          ),
      {},
      true
    );
  }, []);

  const createIndexVolume = useCallback((nodeName: string, path: string) => {
    const state = store.getState();
    var url = new URL(
      `${
        state.config.values.stroomBaseServiceUrl
      }/stroom-index/volume/v1/${name}`
    );

    const body = JSON.stringify({ nodeName, path });

    httpClient.httpPost(
      url.href,
      response =>
        response
          .json()
          .then((indexVolume: IndexVolume) =>
            store.dispatch(indexVolumeCreated(indexVolume))
          ),
      { body }
    );
  }, []);

  const addVolumeToGroup = useCallback(
    (indexVolumeId: string, groupName: string) => {
      const state = store.getState();
      const url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/{volumeId}/{groupName}`
      );

      httpClient.httpPost(url.href, response =>
        response
          .text()
          .then(() =>
            store.dispatch(indexVolumeAddedToGroup(indexVolumeId, groupName))
          )
      );
    },
    []
  );

  const removeVolumeFromGroup = useCallback(
    (indexVolumeId: string, groupName: string) => {
      const state = store.getState();
      const url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/{volumeId}/{groupName}`
      );

      httpClient.httpDelete(url.href, response =>
        response
          .text()
          .then(() =>
            store.dispatch(
              indexVolumeRemovedFromGroup(indexVolumeId, groupName)
            )
          )
      );
    },
    []
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
