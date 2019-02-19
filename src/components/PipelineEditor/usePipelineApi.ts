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
import { PipelineModelType, PipelineSearchResultType } from "../../types";
import { useContext } from "react";
import { StoreContext } from "redux-react-hook";

const {
  pipelineReceived,
  pipelineSaveRequested,
  pipelineSaved,
  pipelinesReceived
} = actionCreators;

export interface Api {
  fetchPipeline: (pipelineId: string) => void;
  savePipeline: (pipelineId: string) => void;
  searchPipelines: () => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  return {
    fetchPipeline: (pipelineId: string) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/pipelines/v1/${pipelineId}`;
      wrappedGet(store.dispatch, state, url, response =>
        response
          .json()
          .then((pipeline: PipelineModelType) =>
            store.dispatch(pipelineReceived(pipelineId, pipeline))
          )
      );
    },
    savePipeline: (pipelineId: string) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/pipelines/v1/${pipelineId}`;

      const { pipeline } = state.pipelineEditor.pipelineStates[pipelineId];
      const body = JSON.stringify(pipeline);

      store.dispatch(pipelineSaveRequested(pipelineId));

      wrappedPost(
        store.dispatch,
        state,
        url,
        response =>
          response.text().then(() => store.dispatch(pipelineSaved(pipelineId))),
        {
          body
        }
      );
    },
    searchPipelines: () => {
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
      wrappedGet(
        store.dispatch,
        state,
        url,
        response =>
          response
            .json()
            .then((response: PipelineSearchResultType) =>
              store.dispatch(pipelinesReceived(response))
            ),
        {},
        forceGet
      );
    }
  };
};

export default useApi;
