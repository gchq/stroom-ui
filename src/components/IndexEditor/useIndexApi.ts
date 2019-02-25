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
import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";
import { useActionCreators } from "../DocRefEditor";
import useHttpClient from "../../lib/useHttpClient/useHttpClient";
import { IndexDoc } from "../../types";

export interface Api {
  fetchDocument: (indexUuid: string) => void;
  saveDocument: (index: IndexDoc) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const httpClient = useHttpClient();
  const actionCreators = useActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchDocument = useCallback((indexUuid: string) => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/index/v1/${indexUuid}`;
    httpClient.httpGet(
      url,
      response =>
        response
          .json()
          .then((index: IndexDoc) =>
            actionCreators.documentReceived(indexUuid, index)
          ),
      {
        headers: {
          Accept: "application/xml",
          "Content-Type": "application/xml"
        }
      }
    );
  }, []);
  const saveDocument = useCallback((index: IndexDoc) => {
    const state = store.getState();
    const url = `${state.config.values.stroomBaseServiceUrl}/index/v1/${
      index.uuid
    }`;

    httpClient.httpPost(
      url,
      response =>
        response.text().then(() => actionCreators.documentSaved(index.uuid)),
      {
        body: index.data,
        headers: {
          Accept: "application/xml",
          "Content-Type": "application/xml"
        }
      }
    );
  }, []);

  return {
    fetchDocument,
    saveDocument
  };
};

export default useApi;
