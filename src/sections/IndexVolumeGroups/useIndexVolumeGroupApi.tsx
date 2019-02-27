import { StoreContext } from "redux-react-hook";
import { useContext, useCallback } from "react";

import { useActionCreators } from "./redux";
import useHttpClient from "../../lib/useHttpClient/useHttpClient";
import { IndexVolumeGroup } from "../../types";

export interface Api {
  getIndexVolumeGroupNames: () => void;
  getIndexVolumeGroups: () => void;
  getIndexVolumeGroup: (name: string) => void;
  createIndexVolumeGroup: (name: string) => void;
  deleteIndexVolumeGroup: (name: string) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const httpClient = useHttpClient();
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

    httpClient.httpGet(
      url.href,
      r =>
        r
          .json()
          .then((groupNames: Array<string>) =>
            indexVolumeGroupNamesReceived(groupNames)
          ),
      {},
      true
    );
  }, [indexVolumeGroupNamesReceived]);

  const getIndexVolumeGroups = useCallback(() => {
    const state = store.getState();
    var url = new URL(
      `${state.config.values.stroomBaseServiceUrl}/stroom-index/volumeGroup/v1`
    );

    httpClient.httpGet(
      url.href,
      r =>
        r
          .json()
          .then((indexVolumeGroups: Array<IndexVolumeGroup>) =>
            indexVolumeGroupsReceived(indexVolumeGroups)
          ),
      {},
      true
    );
  }, [indexVolumeGroupsReceived]);

  const getIndexVolumeGroup = useCallback(
    (name: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/${name}`
      );

      httpClient.httpGet(
        url.href,
        r =>
          r
            .json()
            .then((indexVolumeGroup: IndexVolumeGroup) =>
              indexVolumeGroupReceived(indexVolumeGroup)
            ),
        {},
        true
      );
    },
    [indexVolumeGroupReceived]
  );

  const createIndexVolumeGroup = useCallback(
    (name: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/${name}`
      );

      httpClient.httpPost(url.href, response =>
        response
          .json()
          .then((indexVolumeGroup: IndexVolumeGroup) =>
            indexVolumeGroupCreated(indexVolumeGroup)
          )
      );
    },
    [indexVolumeGroupCreated]
  );

  const deleteIndexVolumeGroup = useCallback(
    (name: string) => {
      const state = store.getState();
      var url = new URL(
        `${
          state.config.values.stroomBaseServiceUrl
        }/stroom-index/volumeGroup/v1/${name}`
      );

      httpClient.httpDelete(url.href, response =>
        response.text().then(() => indexVolumeGroupDeleted(name))
      );
    },
    [indexVolumeGroupDeleted]
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
