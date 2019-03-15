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
import { useCallback } from "react";

import { useActionCreators } from "../../components/DocRefEditor";
import useHttpClient from "../useHttpClient";
import { IndexDoc } from "../../types";
import useGetStroomBaseServiceUrl from "../useGetStroomBaseServiceUrl";

interface Api {
  fetchDocument: (indexUuid: string) => void;
  saveDocument: (index: IndexDoc) => void;
}

export const useApi = (): Api => {
  const getStroomBaseServiceUrl = useGetStroomBaseServiceUrl();
  const { httpGetJson, httpPostEmptyResponse } = useHttpClient();
  const { documentReceived, documentSaved } = useActionCreators();

  return {
    fetchDocument: useCallback(
      (indexUuid: string) => {
        httpGetJson(`${getStroomBaseServiceUrl()}/index/v1/${indexUuid}`).then(
          (index: IndexDoc) => documentReceived(indexUuid, index)
        );
      },
      [getStroomBaseServiceUrl, httpGetJson, documentReceived]
    ),
    saveDocument: useCallback(
      (docRefContents: IndexDoc) => {
        httpPostEmptyResponse(
          `${getStroomBaseServiceUrl()}/index/v1/${docRefContents.uuid}`,
          {
            body: docRefContents
          }
        ).then(() => documentSaved(docRefContents.uuid));
      },
      [getStroomBaseServiceUrl, httpPostEmptyResponse, documentSaved]
    )
  };
};

export default useApi;
