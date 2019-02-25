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
import { useActionCreators as useDocRefActionCreators } from "../DocRefEditor";
import useHttpClient from "../../lib/useHttpClient/useHttpClient";
import { PipelineModelType, PipelineSearchResultType } from "../../types";
import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";
import { useActionCreators as useSearchActionCreators } from "./pipelineSearch";

export interface Api {
  fetchPipeline: (pipelineId: string) => void;
  savePipeline: (document: PipelineModelType) => void;
  searchPipelines: () => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const httpClient = useHttpClient();
  const docRefActionCreators = useDocRefActionCreators();
  const searchActionCreators = useSearchActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchPipeline = useCallback((pipelineId: string) => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/pipelines/v1/${pipelineId}`;
    httpClient.httpGet(url, response =>
      response
        .json()
        .then((pipeline: PipelineModelType) =>
          docRefActionCreators.documentReceived(pipelineId, pipeline)
        )
    );
  }, []);
  const savePipeline = useCallback((document: PipelineModelType) => {
    const state = store.getState();
    const url = `${state.config.values.stroomBaseServiceUrl}/pipelines/v1/${
      document.docRef.uuid
    }`;

    const body = JSON.stringify(document);

    docRefActionCreators.documentSaveRequested(document.docRef.uuid);

    httpClient.httpPost(
      url,
      response =>
        response
          .text()
          .then(() => docRefActionCreators.documentSaved(document.docRef.uuid)),
      {
        body
      }
    );
  }, []);
  const searchPipelines = useCallback(() => {
    const state = store.getState();
    let url = `${state.config.values.stroomBaseServiceUrl}/pipelines/v1/?`;
    const {
      filter,
      pageSize,
      pageOffset
    } = state.pipelineEditor.search.criteria;

    if (filter !== undefined && filter !== "") {
      url += `&filter=${filter}`;
    }

    if (pageSize !== undefined && pageOffset !== undefined) {
      url += `&pageSize=${pageSize}&offset=${pageOffset}`;
    }

    const forceGet = true;
    httpClient.httpGet(
      url,
      response =>
        response
          .json()
          .then((response: PipelineSearchResultType) =>
            searchActionCreators.pipelinesReceived(response)
          ),
      {},
      forceGet
    );
  }, []);

  return {
    fetchPipeline,
    savePipeline,
    searchPipelines
  };
};

export default useApi;
