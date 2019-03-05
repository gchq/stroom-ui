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
import { useActionCreators } from "../../components/DocRefEditor";
import useHttpClient from "../useHttpClient";
import { IndexDoc } from "../../types";

export interface Api {
  fetchDocument: (indexUuid: string) => void;
  saveDocument: (index: IndexDoc) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const { httpGetJson, httpPostEmptyResponse } = useHttpClient();
  const { documentReceived, documentSaved } = useActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchDocument = useCallback(
    (indexUuid: string) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/index/v1/${indexUuid}`;
      httpGetJson(url).then((index: IndexDoc) =>
        documentReceived(indexUuid, index)
      );
    },
    [httpGetJson, documentReceived]
  );
  const saveDocument = useCallback(
    (docRefContents: IndexDoc) => {
      const state = store.getState();
      const url = `${state.config.values.stroomBaseServiceUrl}/index/v1/${
        docRefContents.uuid
      }`;

      httpPostEmptyResponse(url, {
        body: docRefContents
      }).then(() => documentSaved(docRefContents.uuid));
    },
    [httpPostEmptyResponse, documentSaved]
  );

  return {
    fetchDocument,
    saveDocument
  };
};

export default useApi;
