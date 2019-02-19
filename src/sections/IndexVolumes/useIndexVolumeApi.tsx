import { useContext } from "react";
import { StoreContext } from "redux-react-hook";

import { actionCreators } from "./redux";
import {
  wrappedGet,
  wrappedPost,
  wrappedDelete
} from "../../lib/fetchTracker.redux";
import { IndexVolume } from "../../types";

const {
  indexVolumesReceived,
  indexVolumeReceived,
  indexVolumesInGroupReceived,
  indexVolumeCreated,
  indexVolumeDeleted,
  indexVolumeAddedToGroup,
  indexVolumeRemovedFromGroup
} = actionCreators;

export interface Api {
  getIndexVolumes: () => void;
  getIndexVolumeById: (id: number) => void;
  deleteIndexVolume: (id: number) => void;
  getIndexVolumesInGroup: (groupName: string) => void;
  createIndexVolume: (nodeName: string, path: string) => void;
  addVolumeToGroup: (indexVolumeId: number, groupName: string) => void;
  removeVolumeFromGroup: (indexVolumeId: number, groupName: string) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  return {
    getIndexVolumes: () => {
      const state = store.getState();

      var url = new URL(
        `${state.config.values.stroomBaseServiceUrl}/stroom-index/volume/v1`
      );

      wrappedGet(
        store.dispatch,
        state,
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
    },

    getIndexVolumeById: (id: number) => {
      const state = store.getState();

      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/${id}`
      );

      wrappedGet(
        store.dispatch,
        state,
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
    },

    deleteIndexVolume: (id: number) => {
      const state = store.getState();

      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/${id}`
      );

      wrappedDelete(
        store.dispatch,
        state,
        url.href,
        r =>
          r
            .json()
            .then((indexVolume: IndexVolume) =>
              store.dispatch(indexVolumeDeleted(id))
            ),
        {}
      );
    },

    getIndexVolumesInGroup: (groupName: string) => {
      const state = store.getState();

      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/${groupName}`
      );

      wrappedGet(
        store.dispatch,
        state,
        url.href,
        r =>
          r
            .json()
            .then((indexVolumes: Array<IndexVolume>) =>
              store.dispatch(
                indexVolumesInGroupReceived(groupName, indexVolumes)
              )
            ),
        {},
        true
      );
    },

    createIndexVolume: (nodeName: string, path: string) => {
      const state = store.getState();

      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/${name}`
      );

      const body = JSON.stringify({ nodeName, path });

      wrappedPost(
        store.dispatch,
        state,
        url.href,
        response =>
          response
            .json()
            .then((indexVolume: IndexVolume) =>
              store.dispatch(indexVolumeCreated(indexVolume))
            ),
        { body }
      );
    },

    addVolumeToGroup: (indexVolumeId: number, groupName: string) => {
      const state = store.getState();

      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/{volumeId}/{groupName}`
      );

      wrappedPost(store.dispatch, state, url.href, response =>
        response
          .text()
          .then(() =>
            store.dispatch(indexVolumeAddedToGroup(indexVolumeId, groupName))
          )
      );
    },

    removeVolumeFromGroup: (indexVolumeId: number, groupName: string) => {
      const state = store.getState();

      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volume/v1/inGroup/{volumeId}/{groupName}`
      );

      wrappedDelete(store.dispatch, state, url.href, response =>
        response
          .text()
          .then(() =>
            store.dispatch(
              indexVolumeRemovedFromGroup(indexVolumeId, groupName)
            )
          )
      );
    }
  };
};

export default useApi;
