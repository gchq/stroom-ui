import { StoreContext } from "redux-react-hook";
import { useContext, useCallback } from "react";

import { useActionCreators } from "./redux";
import useHttpClient from "../useHttpClient";
import { IndexVolumeGroup } from "../../types";

export interface Api {
  getIndexVolumeGroupNames: () => void;
  getIndexVolumeGroups: () => void;
  getIndexVolumeGroup: (name: string) => void;
  createIndexVolumeGroup: (name: string) => Promise<IndexVolumeGroup>;
  deleteIndexVolumeGroup: (name: string) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const {
    httpGetJson,
    httpPostJsonResponse,
    httpDeleteEmptyResponse
  } = useHttpClient();
  const {
    indexVolumeGroupNamesReceived,
    indexVolumeGroupsReceived,
    indexVolumeGroupReceived,
    indexVolumeGroupCreated,
    indexVolumeGroupDeleted
  } = useActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const getIndexVolumeGroupNames = useCallback(() => {
    const state = store.getState();
    var url = new URL(
      `${
        state.config.values.stroomBaseServiceUrl
      }/stroom-index/volumeGroup/v1/names`
    );

    httpGetJson(url.href).then(indexVolumeGroupNamesReceived);
  }, [httpGetJson, indexVolumeGroupNamesReceived]);

  const getIndexVolumeGroups = useCallback(() => {
    const state = store.getState();
    var url = new URL(
      `${state.config.values.stroomBaseServiceUrl}/stroom-index/volumeGroup/v1`
    );

    httpGetJson(url.href).then(indexVolumeGroupsReceived);
  }, [httpGetJson, indexVolumeGroupsReceived]);

  const getIndexVolumeGroup = useCallback(
    (name: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/${name}`
      );
      httpGetJson(url.href).then(indexVolumeGroupReceived);
    },
    [httpGetJson, indexVolumeGroupReceived]
  );

  const createIndexVolumeGroup = useCallback(
    (name: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/${name}`
      );

      let p = httpPostJsonResponse(url.href);
      p.then(indexVolumeGroupCreated);
      return p;
    },
    [httpPostJsonResponse, indexVolumeGroupCreated]
  );

  const deleteIndexVolumeGroup = useCallback(
    (name: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/${name}`
      );

      httpDeleteEmptyResponse(url.href).then(() =>
        indexVolumeGroupDeleted(name)
      );
    },
    [httpDeleteEmptyResponse, indexVolumeGroupDeleted]
  );

  return {
    createIndexVolumeGroup,
    deleteIndexVolumeGroup,
    getIndexVolumeGroup,
    getIndexVolumeGroupNames,
    getIndexVolumeGroups
  };
};

export default useApi;
