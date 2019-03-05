import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import { useActionCreators } from "./redux";
import useHttpClient from "../useHttpClient";

export interface Api {
  fetchElements: () => void;
  fetchElementProperties: () => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const { httpGetJson } = useHttpClient();
  const { elementsReceived, elementPropertiesReceived } = useActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchElements = useCallback(() => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/elements/v1/elements`;
    httpGetJson(url).then(elementsReceived);
  }, [httpGetJson, elementsReceived]);
  const fetchElementProperties = useCallback(() => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/elements/v1/elementProperties`;
    httpGetJson(url).then(elementPropertiesReceived);
  }, [httpGetJson, elementPropertiesReceived]);

  return {
    fetchElementProperties,
    fetchElements
  };
};

export default useApi;
