import { useContext } from "react";
import { StoreContext } from "redux-react-hook";
import { actionCreators } from "./redux";
import { wrappedGet } from "../../lib/fetchTracker.redux";
import { AbstractFetchDataResult } from "../../types";

export interface Api {
  getDataForSelectedRow: (dataViewerId: string) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  return {
    getDataForSelectedRow: (dataViewerId: string) => {
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

      wrappedGet(
        store.dispatch,
        state,
        url.href,
        response => {
          response.json().then((data: AbstractFetchDataResult) => {
            store.dispatch(
              actionCreators.updateDataForSelectedRow(dataViewerId, data)
            );
          });
        },
        {},
        true
      );
    }
  };
};

export default useApi;
