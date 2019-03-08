import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import useHttpClient from "../useHttpClient";
import {
  ElementDefinitions,
  ElementPropertiesByElementIdType
} from "../../types";

interface Api {
  fetchElements: () => Promise<ElementDefinitions>;
  fetchElementProperties: () => Promise<ElementPropertiesByElementIdType>;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const { httpGetJson } = useHttpClient();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchElements = useCallback(() => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/elements/v1/elements`;
    return httpGetJson(url, {}, false);
  }, [httpGetJson]);
  const fetchElementProperties = useCallback(() => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/elements/v1/elementProperties`;
    return httpGetJson(url, {}, false);
  }, [httpGetJson]);

  return {
    fetchElementProperties,
    fetchElements
  };
};

export default useApi;
