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
import { actionCreators } from "./redux";
import { wrappedGet, wrappedPost } from "../../lib/fetchTracker.redux";
import { useContext } from "react";
import { StoreContext } from "redux-react-hook";

const { indexReceived, indexSaved } = actionCreators;

export interface Api {
  fetchDocument: (indexUuid: string) => void;
  saveDocument: (indexUuid: string) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  return {
    fetchDocument: (indexUuid: string) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/index/v1/${indexUuid}`;
      wrappedGet(
        store.dispatch,
        state,
        url,
        response =>
          response
            .text()
            .then((index: string) =>
              store.dispatch(indexReceived(indexUuid, index))
            ),
        {
          headers: {
            Accept: "application/xml",
            "Content-Type": "application/xml"
          }
        }
      );
    },
    saveDocument: (indexUuid: string) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/index/v1/${indexUuid}`;

      const body = state.indexEditor[indexUuid].indexData;

      wrappedPost(
        store.dispatch,
        state,
        url,
        response =>
          response.text().then(() => store.dispatch(indexSaved(indexUuid))),
        {
          body,
          headers: {
            Accept: "application/xml",
            "Content-Type": "application/xml"
          }
        }
      );
    }
  };
};

export default useApi;
