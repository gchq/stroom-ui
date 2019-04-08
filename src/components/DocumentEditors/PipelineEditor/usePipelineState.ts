import * as React from "react";

import useDocumentApi from "src/api/useDocumentApi";
import { useDocRefEditor } from "../DocRefEditor";
import {
  getPipelineAsTree,
  moveElementInPipeline,
  removeElementFromPipeline,
  createNewElementInPipeline,
  reinstateElementToPipeline,
  setElementPropertyValueInPipeline,
  revertPropertyToParent,
  revertPropertyToDefault,
} from "./pipelineUtils";
import { PipelineEditApi, PipelineProps } from "./types";
import { PipelineDocumentType } from "src/api/useDocumentApi/types/pipelineDoc";

export const usePipelineState = (pipelineId: string): PipelineProps => {
  const documentApi = useDocumentApi<"Pipeline", PipelineDocumentType>(
    "Pipeline",
  );

  const [selectedElementId, setSelectedElementId] = React.useState<
    string | undefined
  >(undefined);
  const [elementInitialValues, setInitialValues] = React.useState<object>({});

  const useEditorProps = useDocRefEditor({
    docRefUuid: pipelineId,
    documentApi,
  });

  const {
    editorProps: { docRefContents },
    onDocumentChange,
  } = useEditorProps;
  const asTree = React.useMemo(() => getPipelineAsTree(docRefContents), [
    docRefContents,
  ]);

  return {
    asTree,
    useEditorProps,
    pipelineEditApi: {
      elementInitialValues,
      selectedElementId,
      settingsUpdated: React.useCallback<PipelineEditApi["settingsUpdated"]>(
        ({ description }) => {
          onDocumentChange({ description });
        },
        [onDocumentChange],
      ),
      elementSelected: React.useCallback<PipelineEditApi["elementReinstated"]>(
        (elementId, initialValues) => {
          setSelectedElementId(elementId);
          setInitialValues(initialValues);
        },
        [setSelectedElementId, setInitialValues],
      ),
      elementSelectionCleared: React.useCallback<
        PipelineEditApi["elementSelectionCleared"]
      >(() => {
        setSelectedElementId(undefined);
        setInitialValues({});
      }, [setSelectedElementId, setInitialValues]),
      elementDeleted: React.useCallback<PipelineEditApi["elementDeleted"]>(
        elementId => {
          if (!!docRefContents) {
            onDocumentChange(
              removeElementFromPipeline(docRefContents, elementId),
            );
          }
        },
        [docRefContents],
      ),
      elementReinstated: React.useCallback<
        PipelineEditApi["elementReinstated"]
      >(
        (parentId, recycleData) => {
          if (!!docRefContents) {
            onDocumentChange(
              reinstateElementToPipeline(docRefContents, parentId, recycleData),
            );
          }
        },
        [docRefContents],
      ),
      elementAdded: React.useCallback<PipelineEditApi["elementAdded"]>(
        newElement => {
          if (!!docRefContents) {
            onDocumentChange(
              createNewElementInPipeline(docRefContents, newElement),
            );
          }
        },
        [docRefContents, onDocumentChange],
      ),
      elementMoved: React.useCallback<PipelineEditApi["elementMoved"]>(
        (itemToMove, destination) => {
          if (!!docRefContents) {
            onDocumentChange(
              moveElementInPipeline(docRefContents, itemToMove, destination),
            );
          }
        },
        [],
      ),
      elementPropertyUpdated: React.useCallback<
        PipelineEditApi["elementPropertyUpdated"]
      >((element, name, propertyType, propertyValue) => {
        if (!!docRefContents) {
          onDocumentChange(
            setElementPropertyValueInPipeline(
              docRefContents,
              element,
              name,
              propertyType,
              propertyValue,
            ),
          );
        }
      }, []),
      elementPropertyRevertToDefault: React.useCallback<
        PipelineEditApi["elementPropertyRevertToDefault"]
      >((elementId, name) => {
        if (!!docRefContents) {
          onDocumentChange(
            revertPropertyToDefault(docRefContents, elementId, name),
          );
        }
      }, []),
      elementPropertyRevertToParent: React.useCallback<
        PipelineEditApi["elementPropertyRevertToParent"]
      >((elementId, name) => {
        if (!!docRefContents) {
          onDocumentChange(
            revertPropertyToParent(docRefContents, elementId, name),
          );
        }
      }, []),
    },
  };
};

export default usePipelineState;
