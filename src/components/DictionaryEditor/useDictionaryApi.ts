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
import { useContext } from "react";
import { StoreContext } from "redux-react-hook";
import { actionCreators } from "./redux";
import { wrappedGet, wrappedPost } from "../../lib/fetchTracker.redux";
import { Dictionary } from "../../types";

const { dictionaryReceived, dictionarySaved } = actionCreators;

export interface Api {
  fetchDocument: (dictionaryUuid: string) => void;
  saveDocument: (dictionaryUuid: string) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  return {
    fetchDocument: (dictionaryUuid: string) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/dictionary/v1/${dictionaryUuid}`;
      wrappedGet(store.dispatch, state, url, response =>
        response
          .json()
          .then((dictionary: Dictionary) =>
            store.dispatch(dictionaryReceived(dictionaryUuid, dictionary))
          )
      );
    },
    saveDocument: (dictionaryUuid: string) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/dictionary/v1/${dictionaryUuid}`;

      const body = JSON.stringify(
        state.dictionaryEditor[dictionaryUuid].dictionary
      );

      wrappedPost(
        store.dispatch,
        state,
        url,
        response =>
          response
            .text()
            .then(() => store.dispatch(dictionarySaved(dictionaryUuid))),
        {
          body
        }
      );
    }
  };
};

export default useApi;
