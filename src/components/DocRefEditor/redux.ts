/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Action } from "redux";

import {
  prepareReducerById,
  StateById,
  ActionId
} from "../../lib/redux-actions-ts";

export const DOCUMENT_RECEIVED = "DOCUMENT_RECEIVED";
export const DOCUMENT_CHANGES_MADE = "DOCUMENT_CHANGES_MADE";
export const DOCUMENT_SAVED = "DOCUMENT_SAVED";

export interface DocumentAction extends ActionId {
  document: object;
}

export interface DocumentReceivedAction
  extends Action<"DOCUMENT_RECEIVED">,
    DocumentAction {}
export interface DocumentChangesMadeAction
  extends Action<"DOCUMENT_CHANGES_MADE">,
    DocumentAction {}
export interface DocumentSavedAction
  extends Action<"DOCUMENT_SAVED">,
    ActionId {}

export const actionCreators = {
  documentReceived: (id: string, document: object): DocumentReceivedAction => ({
    type: DOCUMENT_RECEIVED,
    id,
    document
  }),
  documentChangesMade: (
    id: string,
    document: object
  ): DocumentChangesMadeAction => ({
    type: DOCUMENT_CHANGES_MADE,
    id,
    document
  }),
  documentSaved: (id: string): DocumentSavedAction => ({
    type: DOCUMENT_SAVED,
    id
  })
};

export interface StoreStateById {
  isDirty: boolean;
  isSaving: boolean;
  document?: object;
}

export type StoreState = StateById<StoreStateById>;

export const defaultStatePerId: StoreStateById = {
  isDirty: false,
  document: undefined,
  isSaving: false
};

export const reducer = prepareReducerById(defaultStatePerId)
  .handleAction<DocumentReceivedAction>(
    DOCUMENT_RECEIVED,
    (_, { document }) => ({
      isDirty: false,
      isSaving: false,
      document
    })
  )
  .handleAction<DocumentChangesMadeAction>(
    DOCUMENT_CHANGES_MADE,
    (state: StoreStateById, { document }) => ({
      isDirty: true,
      isSaving: false,
      document: {
        ...state.document,
        ...document
      }
    })
  )
  .handleAction<DocumentSavedAction>(DOCUMENT_SAVED, state => ({
    ...state,
    isDirty: false,
    isSaving: false
  }))
  .getReducer();
