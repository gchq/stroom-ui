import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import { useActionCreators } from "./redux";
import useHttpClient from "../../../lib/useHttpClient/useHttpClient";
import {
  ElementPropertiesByElementIdType,
  ElementDefinition
} from "../../../types";

export interface Api {
  fetchElements: () => void;
  fetchElementProperties: () => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const httpClient = useHttpClient();
  const actionCreators = useActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchElements = useCallback(() => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/elements/v1/elements`;
    httpClient.httpGet(url, response =>
      response
        .json()
        .then((elements: Array<ElementDefinition>) =>
        actionCreators.elementsReceived(elements)
        )
    );
  }, []);
  const fetchElementProperties = useCallback(() => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/elements/v1/elementProperties`;
    httpClient.httpGet(url, response =>
      response
        .json()
        .then((elementProperties: ElementPropertiesByElementIdType) =>
        actionCreators.elementPropertiesReceived(elementProperties)
        )
    );
  }, []);

  return {
    fetchElementProperties,
    fetchElements
  };
};

export default useApi;
