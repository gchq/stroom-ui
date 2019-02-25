import { Action } from "redux";
import { useMemo, useCallback } from "react";
import * as uuidv4 from "uuid";

import useExplorerApi, { SearchProps } from "../FolderExplorer/useExplorerApi";

import {
  prepareReducerById,
  ActionId,
  StateById,
  genUseActionCreators
} from "../../lib/redux-actions-ts";
import { DocRefType } from "../../types";
import useReduxState from "../../lib/useReduxState";

export enum SearchMode {
  GLOBAL_SEARCH,
  NAVIGATION,
  RECENT_ITEMS
}

export const SEARCH_RESULTS_RETURNED = "SEARCH_RESULTS_RETURNED";

export interface SearchResultsReturnedAction
  extends Action<"SEARCH_RESULTS_RETURNED">,
    ActionId {
  searchResults: Array<DocRefType>;
}

export const useActionCreators = genUseActionCreators({
  searchResultsReturned: (
    id: string,
    searchResults: Array<DocRefType>
  ): SearchResultsReturnedAction => ({
    type: SEARCH_RESULTS_RETURNED,
    id,
    searchResults
  })
});

export type StoreStatePerId = Array<DocRefType>;

export type StoreState = StateById<StoreStatePerId>;

export const defaultStatePerId: StoreStatePerId = [];

export const reducer = prepareReducerById(defaultStatePerId)
  .handleAction<SearchResultsReturnedAction>(
    SEARCH_RESULTS_RETURNED,
    (state: StoreStatePerId, { searchResults }) => searchResults
  )
  .getReducer();

export interface UseAppSearchState {
  searchResults: StoreStatePerId;
  onSearch: (p: SearchProps) => void;
}

export const useAppSearchState = (): UseAppSearchState => {
  const componentId = useMemo(() => uuidv4(), []);
  const { appSearch } = useReduxState(({ appSearch }) => ({ appSearch }));

  const explorerApi = useExplorerApi();

  return {
    searchResults: appSearch[componentId] || defaultStatePerId,
    onSearch: useCallback(p => explorerApi.searchApp(componentId, p), [
      explorerApi,
      componentId
    ])
  };
};
