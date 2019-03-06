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
import { useEffect, useCallback } from "react";
import PanelGroup from "react-panelgroup";

import Loader from "../Loader";
import AddElementModal, {
  useDialog as useAddElementDialog
} from "./AddElementModal";
import { ButtonProps } from "../Button";
import PipelineSettings, {
  useDialog as usePipelineSettingsDialog
} from "./PipelineSettings";
import ElementPalette from "./ElementPalette";
import DeletePipelineElement, {
  useDialog as useDeleteElementDialog
} from "./DeletePipelineElement";
import { ElementDetails } from "./ElementDetails";
import { useApi as usePipelineApi } from "../../api/pipelineDocument";
import Pipeline from "./Pipeline";
import DocRefEditor from "../DocRefEditor";
import usePipelineState from "./usePipelineState";

export interface Props {
  pipelineId: string;
}

const PipelineEditor = ({ pipelineId }: Props) => {
  const { fetchPipeline } = usePipelineApi();

  useEffect(() => {
    fetchPipeline(pipelineId);
  }, [fetchPipeline]);

  const piplineStateProps = usePipelineState(pipelineId);
  const {
    pipelineEditApi,
    useEditorProps: { docRefContents: pipeline, editorProps }
  } = piplineStateProps;

  const {
    settingsUpdated,
    elementAdded,
    elementDeleted,
    selectedElementId
  } = pipelineEditApi;

  const {
    showDialog: showSettingsDialog,
    componentProps: settingsComponentProps
  } = usePipelineSettingsDialog(description =>
    settingsUpdated({ description })
  );

  const {
    showDialog: showAddElementDialog,
    componentProps: addElementComponentProps
  } = useAddElementDialog(elementAdded);

  const {
    showDialog: showDeleteElementDialog,
    componentProps: deleteElementComponentProps
  } = useDeleteElementDialog(elementIdToDelete => {
    elementDeleted(elementIdToDelete);
  });

  const onClickOpenSettings = useCallback(() => {
    if (!!pipeline) {
      showSettingsDialog(pipeline.description || "something");
    } else {
      console.error("No pipeline set");
    }
  }, [showSettingsDialog, pipeline]);

  const actionBarItems: Array<ButtonProps> = [
    {
      icon: "cogs",
      title: "Open Settings",
      onClick: onClickOpenSettings
    },
    ...editorProps.actionBarItems,
    {
      icon: "recycle",
      title: "Create Child Pipeline",
      onClick: () =>
        console.log("TODO - Implement Selection of Parent Pipeline")
    }
  ];

  if (!pipeline) {
    return <Loader message="Loading pipeline..." />;
  }

  return (
    <DocRefEditor {...editorProps} actionBarItems={actionBarItems}>
      <div className="Pipeline-editor">
        <AddElementModal {...addElementComponentProps} />
        <DeletePipelineElement {...deleteElementComponentProps} />
        <PipelineSettings {...settingsComponentProps} />
        <div className="Pipeline-editor__element-palette">
          <ElementPalette
            pipeline={pipeline}
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
              pipelineStateProps={piplineStateProps}
              showAddElementDialog={showAddElementDialog}
            />
          </div>
          {selectedElementId !== undefined ? (
            <ElementDetails
              pipeline={pipeline}
              pipelineEditApi={pipelineEditApi}
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
