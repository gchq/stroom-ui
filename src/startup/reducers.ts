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

import { combineReducers } from "redux";

import {
  reducer as errorPage,
  StoreState as ErrorPageState
} from "../components/ErrorPage";
import { reducer as config, StoreState as ConfigStoreState } from "./config";

import {
  authenticationReducer as authentication,
  authorisationReducer as authorisation,
  AuthenticationStoreState,
  AuthorisationStoreState
} from "./Authentication";

import {
  reducer as authorisationManager,
  StoreState as UserStoreState
} from "../sections/AuthorisationManager/redux";
import {
  reducer as folderExplorer,
  StoreState as FolderExplorerStoreState
} from "../components/FolderExplorer/redux";
import {
  reducer as pipelineEditor,
  StoreState as PipelineEditorStoreState
} from "../api/pipelineDocument";
import {
  reducer as elements,
  StoreState as ElementStoreState
} from "../api/elements";
import {
  reducer as debuggers,
  StoreState as DebuggersStoreState
} from "../components/PipelineDebugger";
import {
  reducer as indexVolumeGroups,
  StoreState as IndexVolumeGroupStoreState
} from "../sections/IndexVolumeGroups";
import {
  reducer as indexVolumes,
  StoreState as IndexVolumeStoreState
} from "../sections/IndexVolumes";
import {
  reducer as processing,
  StoreState as ProcessingStoreState
} from "../sections/Processing";
import {
  reducer as dataViewers,
  StoreState as DataViewersStoreState
} from "../sections/DataViewer";
import {
  reducer as docRefEditors,
  StoreState as DocRefEditorStoreState
} from "../components/DocRefEditor";

export interface GlobalStoreState {
  errorPage: ErrorPageState;
  config: ConfigStoreState;
  authentication: AuthenticationStoreState;
  authorisation: AuthorisationStoreState;
  folderExplorer: FolderExplorerStoreState;
  pipelineEditor: PipelineEditorStoreState;
  debuggers: DebuggersStoreState;
  processing: ProcessingStoreState;
  dataViewers: DataViewersStoreState;
  authorisationManager: UserStoreState;
  indexVolumeGroups: IndexVolumeGroupStoreState;
  indexVolumes: IndexVolumeStoreState;
  docRefEditors: DocRefEditorStoreState;
  elements: ElementStoreState;
}

export default combineReducers({
  errorPage,
  config,
  authentication,
  authorisation,
  folderExplorer,
  pipelineEditor,
  debuggers,
  processing,
  dataViewers,
  authorisationManager,
  indexVolumeGroups,
  indexVolumes,
  docRefEditors,
  elements
});
