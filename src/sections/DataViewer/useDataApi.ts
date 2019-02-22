import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";
import { useActionCreators } from "./redux";
import useHttpClient from "../../lib/useHttpClient/useHttpClient";
import { AbstractFetchDataResult } from "../../types";

export interface Api {
  getDataForSelectedRow: (dataViewerId: string) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const httpClient = useHttpClient();
  const actionCreators = useActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const getDataForSelectedRow = useCallback((dataViewerId: string) => {
    const state = store.getState();

    // TODO get other parms, e.g. for paging
    const selectedRow = state.dataViewers[dataViewerId].selectedRow;
    const metaId =
      state.dataViewers[dataViewerId] &&
      state.dataViewers[dataViewerId].streamAttributeMaps &&
      selectedRow
        ? state.dataViewers[dataViewerId]!.streamAttributeMaps![selectedRow]
            .data.id
        : undefined;

    var url = new URL(`${state.config.values.stroomBaseServiceUrl}/data/v1/`);
    if (!!metaId) url.searchParams.append("metaId", metaId.toString());
    url.searchParams.append("streamsOffset", "0");
    url.searchParams.append("streamsLength", "1");
    url.searchParams.append("pageOffset", "0");
    url.searchParams.append("pageSize", "100");

    httpClient.httpGet(
      url.href,
      response => {
        response.json().then((data: AbstractFetchDataResult) => {
          actionCreators.updateDataForSelectedRow(dataViewerId, data);
        });
      },
      {},
      true
    );
  }, []);

  return {
    getDataForSelectedRow
  };
};

export default useApi;
