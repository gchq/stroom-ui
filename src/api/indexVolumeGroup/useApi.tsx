import { StoreContext } from "redux-react-hook";
import { useContext, useCallback } from "react";

import useHttpClient from "../useHttpClient";
import { IndexVolumeGroup } from "../../types";

interface Api {
  getIndexVolumeGroupNames: () => Promise<Array<string>>;
  getIndexVolumeGroups: () => Promise<Array<IndexVolumeGroup>>;
  getIndexVolumeGroup: (name: string) => Promise<IndexVolumeGroup>;
  createIndexVolumeGroup: (name: string) => Promise<IndexVolumeGroup>;
  deleteIndexVolumeGroup: (name: string) => Promise<void>;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const {
    httpGetJson,
    httpPostJsonResponse,
    httpDeleteEmptyResponse
  } = useHttpClient();

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

    return httpGetJson(url.href);
  }, [httpGetJson]);

  const getIndexVolumeGroups = useCallback(() => {
    const state = store.getState();
    var url = new URL(
      `${state.config.values.stroomBaseServiceUrl}/stroom-index/volumeGroup/v1`
    );

    return httpGetJson(url.href);
  }, [httpGetJson]);

  const getIndexVolumeGroup = useCallback(
    (name: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/${name}`
      );
      return httpGetJson(url.href);
    },
    [httpGetJson]
  );

  const createIndexVolumeGroup = useCallback(
    (name: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/${name}`
      );

      return httpPostJsonResponse(url.href);
    },
    [httpPostJsonResponse]
  );

  const deleteIndexVolumeGroup = useCallback(
    (name: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/${name}`
      );

      return httpDeleteEmptyResponse(url.href);
    },
    [httpDeleteEmptyResponse]
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
