import { StoreContext } from "redux-react-hook";
import { useContext } from "react";

import { actionCreators } from "./redux";
import {
  wrappedGet,
  wrappedPost,
  wrappedDelete
} from "../../lib/fetchTracker.redux";
import { IndexVolumeGroup } from "../../types";

const {
  indexVolumeGroupNamesReceived,
  indexVolumeGroupsReceived,
  indexVolumeGroupReceived,
  indexVolumeGroupCreated,
  indexVolumeGroupDeleted
} = actionCreators;

export interface Api {
  getIndexVolumeGroupNames: () => void;
  getIndexVolumeGroups: () => void;
  getIndexVolumeGroup: (name: string) => void;
  createIndexVolumeGroup: (name: string) => void;
  deleteIndexVolumeGroup: (name: string) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  return {
    getIndexVolumeGroupNames: () => {
      const state = store.getState();

      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/names`
      );

      wrappedGet(
        store.dispatch,
        state,
        url.href,
        r =>
          r
            .json()
            .then((groupNames: Array<string>) =>
              store.dispatch(indexVolumeGroupNamesReceived(groupNames))
            ),
        {},
        true
      );
    },

    getIndexVolumeGroups: () => {
      const state = store.getState();

      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1`
      );

      wrappedGet(
        store.dispatch,
        state,
        url.href,
        r =>
          r
            .json()
            .then((indexVolumeGroups: Array<IndexVolumeGroup>) =>
              store.dispatch(indexVolumeGroupsReceived(indexVolumeGroups))
            ),
        {},
        true
      );
    },

    getIndexVolumeGroup: (name: string) => {
      const state = store.getState();

      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/${name}`
      );

      wrappedGet(
        store.dispatch,
        state,
        url.href,
        r =>
          r
            .json()
            .then((indexVolumeGroup: IndexVolumeGroup) =>
              store.dispatch(indexVolumeGroupReceived(indexVolumeGroup))
            ),
        {},
        true
      );
    },

    createIndexVolumeGroup: (name: string) => {
      const state = store.getState();

      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/${name}`
      );

      wrappedPost(store.dispatch, state, url.href, response =>
        response
          .json()
          .then((indexVolumeGroup: IndexVolumeGroup) =>
            store.dispatch(indexVolumeGroupCreated(indexVolumeGroup))
          )
      );
    },

    deleteIndexVolumeGroup: (name: string) => {
      const state = store.getState();

      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/${name}`
      );

      wrappedDelete(store.dispatch, state, url.href, response =>
        response
          .text()
          .then(() => store.dispatch(indexVolumeGroupDeleted(name)))
      );
    }
  };
};

export default useApi;
