import { useContext } from "react";
import { StoreContext } from "redux-react-hook";

import { actionCreators } from "./redux";
import { wrappedGet } from "../../lib/fetchTracker.redux";
import {
  ElementPropertiesByElementIdType,
  ElementDefinition
} from "../../types";

const { elementsReceived, elementPropertiesReceived } = actionCreators;

export interface Api {
  fetchElements: () => void;
  fetchElementProperties: () => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  return {
    fetchElements: () => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/elements/v1/elements`;
      wrappedGet(store.dispatch, state, url, response =>
        response
          .json()
          .then((elements: Array<ElementDefinition>) =>
            store.dispatch(elementsReceived(elements))
          )
      );
    },
    fetchElementProperties: () => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/elements/v1/elementProperties`;
      wrappedGet(store.dispatch, state, url, response =>
        response
          .json()
          .then((elementProperties: ElementPropertiesByElementIdType) =>
            store.dispatch(elementPropertiesReceived(elementProperties))
          )
      );
    }
  };
};

export default useApi;
