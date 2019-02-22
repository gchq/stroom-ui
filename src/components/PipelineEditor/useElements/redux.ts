import { Action } from "redux";

import {
  prepareReducer,
  genUseActionCreators
} from "../../../lib/redux-actions-ts";
import {
  ElementDefinitions,
  ElementPropertiesByElementIdType
} from "../../../types";

export const ELEMENTS_RECEIVED = "ELEMENTS_RECEIVED";
export const ELEMENT_PROPERTIES_RECEIVED = "ELEMENT_PROPERTIES_RECEIVED";

export interface ElementsReceivedAction extends Action<"ELEMENTS_RECEIVED"> {
  elementDefinitions: ElementDefinitions;
}

export interface ElementPropertiesReceivedAction
  extends Action<"ELEMENT_PROPERTIES_RECEIVED"> {
  elementProperties: ElementPropertiesByElementIdType;
}

export interface StoreState {
  elementDefinitions: ElementDefinitions;
  elementProperties: ElementPropertiesByElementIdType;
}

export const defaultState: StoreState = {
  elementDefinitions: [],
  elementProperties: {}
};

export const useActionCreators = genUseActionCreators({
  elementsReceived: (
    elementDefinitions: ElementDefinitions
  ): ElementsReceivedAction => ({
    type: ELEMENTS_RECEIVED,
    elementDefinitions
  }),
  elementPropertiesReceived: (
    elementProperties: ElementPropertiesByElementIdType
  ): ElementPropertiesReceivedAction => ({
    type: ELEMENT_PROPERTIES_RECEIVED,
    elementProperties
  })
});

export const reducer = prepareReducer(defaultState)
  .handleAction<ElementsReceivedAction>(
    ELEMENTS_RECEIVED,
    (state = defaultState, { elementDefinitions }) => ({
      ...state,
      elementDefinitions
    })
  )
  .handleAction<ElementPropertiesReceivedAction>(
    ELEMENT_PROPERTIES_RECEIVED,
    (state = defaultState, { elementProperties }) => ({
      ...state,
      elementProperties
    })
  )
  .getReducer();
