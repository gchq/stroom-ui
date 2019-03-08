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
  ActionId,
  genUseActionCreators
} from "../../lib/redux-actions-ts";

import { StoreStateById } from "./types";

export const DOCUMENT_RECEIVED = "DOCUMENT_RECEIVED";
export const DOCUMENT_CHANGES_MADE = "DOCUMENT_CHANGES_MADE";
export const DOCUMENT_SAVE_REQUESTED = "DOCUMENT_SAVE_REQUESTED";
export const DOCUMENT_SAVED = "DOCUMENT_SAVED";

interface DocumentAction extends ActionId {
  docRefContents: object;
}

interface DocumentReceivedAction
  extends Action<"DOCUMENT_RECEIVED">,
    DocumentAction {}
interface DocumentChangesMadeAction
  extends Action<"DOCUMENT_CHANGES_MADE">,
    DocumentAction {}
interface DocumentSavedAction extends Action<"DOCUMENT_SAVED">, ActionId {}
interface DocumentSaveRequestedAction
  extends Action<"DOCUMENT_SAVE_REQUESTED">,
    ActionId {}

export const useActionCreators = genUseActionCreators({
  documentReceived: (
    id: string,
    docRefContents: object
  ): DocumentReceivedAction => ({
    type: DOCUMENT_RECEIVED,
    id,
    docRefContents
  }),
  documentChangesMade: (
    id: string,
    docRefContents: object
  ): DocumentChangesMadeAction => ({
    type: DOCUMENT_CHANGES_MADE,
    id,
    docRefContents
  }),
  documentSaveRequested: (id: string): DocumentSaveRequestedAction => ({
    type: DOCUMENT_SAVE_REQUESTED,
    id
  }),
  documentSaved: (id: string): DocumentSavedAction => ({
    type: DOCUMENT_SAVED,
    id
  })
});

export const defaultStatePerId: StoreStateById = {
  isDirty: false,
  docRefContents: undefined,
  isSaving: false
};

export const reducer = prepareReducerById(defaultStatePerId)
  .handleAction<DocumentReceivedAction>(
    DOCUMENT_RECEIVED,
    (_, { docRefContents }) => ({
      isDirty: false,
      isSaving: false,
      docRefContents
    })
  )
  .handleAction<DocumentChangesMadeAction>(
    DOCUMENT_CHANGES_MADE,
    (state: StoreStateById, { docRefContents }) => ({
      isDirty: true,
      isSaving: false,
      docRefContents: {
        ...state.docRefContents,
        ...docRefContents
      }
    })
  )
  .handleAction<DocumentSavedAction>(DOCUMENT_SAVED, state => ({
    ...state,
    isDirty: false,
    isSaving: false
  }))
  .handleAction<DocumentSaveRequestedAction>(
    DOCUMENT_SAVE_REQUESTED,
    state => ({
      ...state,
      isDirty: true,
      isSaving: true
    })
  )
  .getReducer();
