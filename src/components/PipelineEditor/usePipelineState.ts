import { useEffect, useMemo, useState, useCallback } from "react";

import usePipelineApi from "./usePipelineApi";
import { useDocRefEditor, UseDocRefEditorOutProps } from "../DocRefEditor";
import {
  PipelineModelType,
  PipelineAsTreeType,
  ElementDefinition,
  PipelineElementType
} from "../../types";
import {
  getPipelineAsTree,
  moveElementInPipeline,
  removeElementFromPipeline,
  createNewElementInPipeline,
  reinstateElementToPipeline,
  setElementPropertyValueInPipeline,
  revertPropertyToParent,
  revertPropertyToDefault
} from "./pipelineUtils";

export interface PipelineEditApi {
  selectedElementId?: string;
  elementInitialValues: object;
  settingsUpdated: (p: { description: string }) => void;
  elementSelected: (elementId: string, initialValues?: object) => void;
  elementSelectionCleared: () => void;
  elementMoved: (itemToMove: string, destination: string) => void;
  elementAdded: (
    parentId: string,
    elementDefinition: ElementDefinition,
    name: string
  ) => void;
  elementDeleted: (elementId: string) => void;
  elementReinstated: (
    parentId: string,
    recycleData: PipelineElementType
  ) => void;
  elementPropertyUpdated: (
    element: string,
    name: string,
    propertyType: string,
    propertyValue: any
  ) => void;
  elementPropertyRevertToParent: (elementId: string, name: string) => void;
  elementPropertyRevertToDefault: (elementId: string, name: string) => void;
}

export interface PipelineProps {
  asTree?: PipelineAsTreeType;
  pipelineEditApi: PipelineEditApi;
  useEditorProps: UseDocRefEditorOutProps<PipelineModelType>;
}

export const usePipelineState = (pipelineId: string): PipelineProps => {
  const pipelineApi = usePipelineApi();
  useEffect(() => {
    pipelineApi.fetchPipeline(pipelineId);
  }, [pipelineId]);
  const [selectedElementId, setSelectedElementId] = useState<
    string | undefined
  >(undefined);
  const [elementInitialValues, setInitialValues] = useState<object>({});

  const useEditorProps = useDocRefEditor({
    docRefUuid: pipelineId,
    saveDocument: pipelineApi.savePipeline
  });

  const { docRefContents, onDocumentChange } = useEditorProps;
  const asTree = useMemo(() => getPipelineAsTree(docRefContents), [
    docRefContents
  ]);

  return {
    asTree,
    useEditorProps,
    pipelineEditApi: {
      elementInitialValues,
      selectedElementId,
      settingsUpdated: useCallback<PipelineEditApi["settingsUpdated"]>(
        ({ description }) => {
          onDocumentChange({ description });
        },
        [onDocumentChange]
      ),
      elementSelected: useCallback<PipelineEditApi["elementReinstated"]>(
        (elementId, initialValues) => {
          setSelectedElementId(elementId);
          setInitialValues(initialValues);
        },
        [setSelectedElementId, setInitialValues]
      ),
      elementSelectionCleared: useCallback<
        PipelineEditApi["elementSelectionCleared"]
      >(() => {
        setSelectedElementId(undefined);
        setInitialValues({});
      }, [setSelectedElementId, setInitialValues]),
      elementDeleted: useCallback<PipelineEditApi["elementDeleted"]>(
        elementId => {
          if (!!docRefContents) {
            onDocumentChange(
              removeElementFromPipeline(docRefContents, elementId)
            );
          }
        },
        [docRefContents]
      ),
      elementReinstated: useCallback<PipelineEditApi["elementReinstated"]>(
        (parentId, recycleData) => {
          if (!!docRefContents) {
            onDocumentChange(
              reinstateElementToPipeline(docRefContents, parentId, recycleData)
            );
          }
        },
        [docRefContents]
      ),
      elementAdded: useCallback<PipelineEditApi["elementAdded"]>(
        (parentId, elementDefinition, name) => {
          if (!!docRefContents) {
            onDocumentChange(
              createNewElementInPipeline(
                docRefContents,
                parentId,
                elementDefinition,
                name
              )
            );
          }
        },
        [docRefContents, onDocumentChange]
      ),
      elementMoved: useCallback<PipelineEditApi["elementMoved"]>(
        (itemToMove, destination) => {
          if (!!docRefContents) {
            onDocumentChange(
              moveElementInPipeline(docRefContents, itemToMove, destination)
            );
          }
        },
        []
      ),
      elementPropertyUpdated: useCallback<
        PipelineEditApi["elementPropertyUpdated"]
      >((element, name, propertyType, propertyValue) => {
        if (!!docRefContents) {
          onDocumentChange(
            setElementPropertyValueInPipeline(
              docRefContents,
              element,
              name,
              propertyType,
              propertyValue
            )
          );
        }
      }, []),
      elementPropertyRevertToDefault: useCallback<
        PipelineEditApi["elementPropertyRevertToDefault"]
      >((elementId, name) => {
        if (!!docRefContents) {
          onDocumentChange(
            revertPropertyToDefault(docRefContents, elementId, name)
          );
        }
      }, []),
      elementPropertyRevertToParent: useCallback<
        PipelineEditApi["elementPropertyRevertToParent"]
      >((elementId, name) => {
        if (!!docRefContents) {
          onDocumentChange(
            revertPropertyToParent(docRefContents, elementId, name)
          );
        }
      }, [])
    }
  };
};

export default usePipelineState;
