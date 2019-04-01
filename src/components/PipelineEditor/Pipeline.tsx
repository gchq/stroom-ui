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

import Loader from "../Loader";
import PipelineElement from "./PipelineElement";
import ElbowLine from "./ElbowLine/ElbowLine";
import { getPipelineLayoutGrid } from "./pipelineUtils";
import { PipelineLayoutGrid, CellType } from "./types";
import { PipelineElementType } from "../../types";
import { getAllElementNames } from "./pipelineUtils";
import { ShowDialog as ShowAddElementDialog } from "./AddElementModal";
import { PipelineProps } from "./types";
import useElements from "src/api/useElements";

interface Props {
  pipelineId: string;
  pipelineStateProps: PipelineProps;
  showAddElementDialog: ShowAddElementDialog;
}

export const Pipeline = ({
  pipelineId,
  pipelineStateProps,
  showAddElementDialog
}: Props) => {
  const {
    asTree,
    pipelineEditApi,
    useEditorProps: {
      editorProps: { docRefContents: pipeline }
    }
  } = pipelineStateProps;
  const { elementDefinitions, elementProperties } = useElements();

  if (!pipeline) {
    return <Loader message="Loading pipeline..." />;
  }

  if (!asTree) {
    return <Loader message="Awaiting pipeline tree model..." />;
  }

  const existingNames = getAllElementNames(pipeline);
  const layoutGrid: PipelineLayoutGrid = getPipelineLayoutGrid(asTree);

  return (
    <div className="Pipeline-editor__elements">
      {layoutGrid.rows.map((row, r) => (
        <div key={r} className="Pipeline-editor__elements-row">
          {row.columns.map((column, c) => (
            <div
              key={c}
              className={`Pipeline-editor__elements_cell ${
                CellType[column.cellType]
              }`}
            >
              {column.cellType == CellType.ELEMENT &&
                pipeline &&
                pipeline.merged.elements.add &&
                pipeline.merged.elements.add
                  .filter((e: PipelineElementType) => e.id === column.uuid)
                  .map(element => {
                    let elementDefinition = Object.values(
                      elementDefinitions
                    ).find(e => e.type === element.type)!;
                    let elementPropertiesThis = elementProperties[element.type];

                    return (
                      <PipelineElement
                        key={element.id}
                        pipelineId={pipelineId}
                        elementId={element.id}
                        showAddElementDialog={showAddElementDialog}
                        existingNames={existingNames}
                        pipeline={pipeline}
                        asTree={asTree}
                        elementDefinition={elementDefinition}
                        elementProperties={elementPropertiesThis}
                        pipelineEditApi={pipelineEditApi}
                      />
                    );
                  })}
              {column.cellType == CellType.ELBOW && <ElbowLine north east />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Pipeline;
