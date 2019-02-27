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
  const { httpGet } = useHttpClient();
  const { elementsReceived, elementPropertiesReceived } = useActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchElements = useCallback(() => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/elements/v1/elements`;
    httpGet(url, response =>
      response
        .json()
        .then((elements: Array<ElementDefinition>) =>
          elementsReceived(elements)
        )
    );
  }, [httpGet, elementsReceived]);
  const fetchElementProperties = useCallback(() => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/elements/v1/elementProperties`;
    httpGet(url, response =>
      response
        .json()
        .then((elementProperties: ElementPropertiesByElementIdType) =>
          elementPropertiesReceived(elementProperties)
        )
    );
  }, [httpGet, elementPropertiesReceived]);

  return {
    fetchElementProperties,
    fetchElements
  };
};

export default useApi;
