import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import { actionCreators } from "./redux";
import useHttpClient from "../../lib/useHttpClient/useHttpClient";
import { StreamTasksResponseType } from "../../types";

export enum TrackerSelection {
  first = "first",
  last = "last",
  none = "none"
}

export interface Api {
  fetchTrackers: (trackerSelection?: TrackerSelection) => void;
  fetchMore: (trackerSelection?: TrackerSelection) => void;
  enableToggle: (filterId: number, isCurrentlyEnabled: boolean) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const httpClient = useHttpClient();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchTrackers = useCallback((trackerSelection?: TrackerSelection) => {
    const state = store.getState();

    const rowsToFetch = state.processing.pageSize;
    store.dispatch(actionCreators.updatePageSize(rowsToFetch));

    let url = `${state.config.values.stroomBaseServiceUrl}/streamtasks/v1/?`;
    url += `pageSize=${rowsToFetch}`;
    url += `&offset=${state.processing.pageOffset}`;
    if (state.processing.sortBy !== undefined) {
      url += `&sortBy=${state.processing.sortBy}`;
      url += `&sortDirection=${state.processing.sortDirection}`;
    }

    if (
      state.processing.searchCriteria !== "" &&
      state.processing.searchCriteria !== undefined
    ) {
      url += `&filter=${state.processing.searchCriteria}`;
    }

    httpClient.httpGet(
      url,
      response => {
        response.json().then((trackers: StreamTasksResponseType) => {
          store.dispatch(
            actionCreators.updateTrackers(
              trackers.streamTasks,
              trackers.totalStreamTasks
            )
          );
          switch (trackerSelection) {
            case TrackerSelection.first:
              store.dispatch(actionCreators.selectFirst());
              break;
            case TrackerSelection.last:
              store.dispatch(actionCreators.selectLast());
              break;
            case TrackerSelection.none:
              store.dispatch(actionCreators.selectNone());
              break;
            default:
              break;
          }
        });
      },
      {},
      true
    );
  }, []);

  const fetchMore = useCallback((trackerSelection?: TrackerSelection) => {
    const state = store.getState();

    const rowsToFetch = state.processing.pageSize;
    store.dispatch(actionCreators.updatePageSize(rowsToFetch));

    const nextPageOffset = state.processing.pageOffset + 1;
    store.dispatch(actionCreators.changePage(nextPageOffset));

    let url = `${state.config.values.stroomBaseServiceUrl}/streamtasks/v1/?`;
    url += `pageSize=${rowsToFetch}`;
    url += `&offset=${nextPageOffset}`;
    if (state.processing.sortBy !== undefined) {
      url += `&sortBy=${state.processing.sortBy}`;
      url += `&sortDirection=${state.processing.sortDirection}`;
    }

    if (
      state.processing.searchCriteria !== "" &&
      state.processing.searchCriteria !== undefined
    ) {
      url += `&filter=${state.processing.searchCriteria}`;
    }

    httpClient.httpGet(
      url,
      response => {
        response.json().then((trackers: StreamTasksResponseType) => {
          store.dispatch(
            actionCreators.addTrackers(
              trackers.streamTasks,
              trackers.totalStreamTasks
            )
          );
          switch (trackerSelection) {
            case TrackerSelection.first:
              store.dispatch(actionCreators.selectFirst());
              break;
            case TrackerSelection.last:
              store.dispatch(actionCreators.selectLast());
              break;
            case TrackerSelection.none:
              store.dispatch(actionCreators.selectNone());
              break;
            default:
              break;
          }
        });
      },
      {},
      true
    );
  }, []);

  const enableToggle = useCallback(
    (filterId: number, isCurrentlyEnabled: boolean) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/streamtasks/v1/${filterId}`;
      const body = JSON.stringify({
        op: "replace",
        path: "enabled",
        value: !isCurrentlyEnabled
      });

      httpClient.httpPatch(
        store.dispatch,
        state,
        url,
        () =>
          store.dispatch(
            actionCreators.updateEnabled(filterId, !isCurrentlyEnabled)
          ),
        { body }
      );
    },
    []
  );

  return {
    enableToggle,
    fetchMore,
    fetchTrackers
  };
};

export default useApi;

// TODO: This isn't currently used.
// const getRowsPerPage = (isDetailsVisible) => {
//   const viewport = document.getElementById('table-container');
//   let rowsInViewport = 20; // Fallback default
//   const headerHeight = 46;
//   const footerHeight = 36;
//   // const detailsHeight = 295;
//   const rowHeight = 30;
//   if (viewport) {
//     const viewportHeight = viewport.offsetHeight;
//     const heightAvailableForRows = viewportHeight - headerHeight - footerHeight;
//     // if (isDetailsVisible) {
//     // heightAvailableForRows -= detailsHeight;
//     // }
//     rowsInViewport = Math.floor(heightAvailableForRows / rowHeight);
//   }

//   // Make sure we always request at least 1 row, even if the viewport is too small
//   // to display it without scrolling. Anything less will be rejected by the
//   // service for being rediculous.
//   if (rowsInViewport <= 0) {
//     return 1;
//   }
//   return rowsInViewport;
// };
