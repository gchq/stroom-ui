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

import * as React from "react";
import { useEffect } from "react";
import PanelGroup from "react-panelgroup";

import Loader from "../Loader";
import AddElementModal, {
  useDialog as useAddElementDialog
} from "./AddElementModal";
import { Props as ButtonProps } from "../Button";
import PipelineSettings, {
  useDialog as usePipelineSettingsDialog
} from "./PipelineSettings";
import ElementPalette from "./ElementPalette";
import DeletePipelineElement, {
  useDialog as useDeleteElementDialog
} from "./DeletePipelineElement";
import { ElementDetails } from "./ElementDetails";
import { fetchPipeline, savePipeline } from "./client";
import { actionCreators } from "./redux";
import Pipeline from "./Pipeline";
import DocRefEditor from "../DocRefEditor";
import usePipelineState from "./redux/usePipelineState";
import { useDispatch } from "redux-react-hook";

const {
  pipelineElementSelectionCleared,
  pipelineSettingsUpdated,
  pipelineElementAdded,
  pipelineElementDeleted
} = actionCreators;

export interface Props {
  pipelineId: string;
}

const PipelineEditor = ({ pipelineId }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPipeline(pipelineId);
  });

  const {
    showDialog: showSettingsDialog,
    componentProps: settingsComponentProps
  } = usePipelineSettingsDialog(description =>
    dispatch(pipelineSettingsUpdated(pipelineId, description))
  );

  const {
    showDialog: showAddElementDialog,
    componentProps: addElementComponentProps
  } = useAddElementDialog((parentId, elementDefinition, name) => {
    dispatch(
      pipelineElementAdded(pipelineId, parentId, elementDefinition, name)
    );
  });

  const {
    showDialog: showDeleteElementDialog,
    componentProps: deleteElementComponentProps
  } = useDeleteElementDialog(elementIdToDelete => {
    dispatch(pipelineElementDeleted(pipelineId, elementIdToDelete));
  });

  const pipelineState = usePipelineState(pipelineId);

  if (!(pipelineState && pipelineState.pipeline)) {
    return <Loader message="Loading pipeline..." />;
  }

  const { selectedElementId, isDirty, isSaving } = pipelineState;

  const actionBarItems: Array<ButtonProps> = [
    {
      icon: "cogs",
      title: "Open Settings",
      onClick: () =>
        showSettingsDialog(pipelineState!.pipeline!.description || "something")
    },
    {
      icon: "save",
      disabled: !(isDirty || isSaving),
      title: isSaving ? "Saving..." : isDirty ? "Save" : "Saved",
      onClick: () => savePipeline(pipelineId)
    },
    {
      icon: "recycle",
      title: "Create Child Pipeline",
      onClick: () =>
        console.log("TODO - Implement Selection of Parent Pipeline")
    }
  ];

  return (
    <DocRefEditor docRefUuid={pipelineId} actionBarItems={actionBarItems}>
      <div className="Pipeline-editor">
        <AddElementModal {...addElementComponentProps} />
        <DeletePipelineElement {...deleteElementComponentProps} />
        <PipelineSettings {...settingsComponentProps} />
        <div className="Pipeline-editor__element-palette">
          <ElementPalette
            pipelineId={pipelineId}
            showDeleteElementDialog={showDeleteElementDialog}
          />
        </div>

        <PanelGroup
          direction="column"
          className="Pipeline-editor__content"
          panelWidths={[
            {},
            {
              resize: "dynamic",
              size: selectedElementId !== undefined ? "50%" : 0
            }
          ]}
        >
          <div className="Pipeline-editor__topPanel">
            <Pipeline
              pipelineId={pipelineId}
              showAddElementDialog={showAddElementDialog}
            />
          </div>
          {selectedElementId !== undefined ? (
            <ElementDetails
              pipelineId={pipelineId}
              onClose={() =>
                dispatch(pipelineElementSelectionCleared(pipelineId))
              }
            />
          ) : (
            <div />
          )}
        </PanelGroup>
      </div>
    </DocRefEditor>
  );
};

export default PipelineEditor;
