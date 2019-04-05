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

import Loader from "src/components/Loader";
import PipelineElement from "../PipelineElement";
import { getPipelineLayoutGrid } from "../pipelineUtils";
import { PipelineLayoutGrid } from "../types";
import { PipelineElementType } from "src/types";
import { getAllElementNames } from "../pipelineUtils";
import { ShowDialog as ShowAddElementDialog } from "../AddElementModal";
import { PipelineProps } from "../types";
import useElements from "src/api/useElements";
import { LineContainer, LineTo } from "src/components/LineTo";

interface Props {
  pipelineId: string;
  pipelineStateProps: PipelineProps;
  showAddElementDialog: ShowAddElementDialog;
}

export const Pipeline: React.FunctionComponent<Props> = ({
  pipelineId,
  pipelineStateProps,
  showAddElementDialog,
}) => {
  const {
    asTree,
    pipelineEditApi,
    useEditorProps: {
      editorProps: { docRefContents: pipeline },
    },
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
    <LineContainer className="Pipeline-editor__elements">
      {pipeline &&
        pipeline.merged.links &&
        pipeline.merged.links.add &&
        pipeline.merged.links.add.map(l => (
          <LineTo key={`${l.from}-${l.to}`} fromId={l.from} toId={l.to} />
        ))}
      {layoutGrid.rows.map((row, r) => (
        <div key={r} className="Pipeline-editor__elements-row">
          {row.columns.map((column, c) => (
            <div
              key={c}
              id={column.uuid}
              className={`Pipeline-editor__elements_cell`}
            >
              {column.uuid &&
                pipeline &&
                pipeline.merged.elements.add &&
                pipeline.merged.elements.add
                  .filter((e: PipelineElementType) => e.id === column.uuid)
                  .map(element => {
                    let elementDefinition = Object.values(
                      elementDefinitions,
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
            </div>
          ))}
        </div>
      ))}
    </LineContainer>
  );
};

export default Pipeline;
