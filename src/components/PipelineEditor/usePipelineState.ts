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
  settingsUpdated: (description: string) => void;
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

  const { document, onDocumentChange } = useEditorProps;
  const asTree = useMemo(() => getPipelineAsTree(document), [document]);

  return {
    asTree,
    useEditorProps,
    pipelineEditApi: {
      elementInitialValues,
      selectedElementId,
      settingsUpdated: useCallback(
        ({ description }) => {
          onDocumentChange({ description });
        },
        [onDocumentChange]
      ),
      elementSelected: useCallback(
        (elementId, initialValues) => {
          setSelectedElementId(elementId);
          setInitialValues(initialValues);
        },
        [setSelectedElementId, setInitialValues]
      ),
      elementSelectionCleared: useCallback(() => {
        setSelectedElementId(undefined);
        setInitialValues({});
      }, [setSelectedElementId, setInitialValues]),
      elementDeleted: useCallback(
        elementId => {
          if (!!document) {
            onDocumentChange(removeElementFromPipeline(document, elementId));
          }
        },
        [document]
      ),
      elementReinstated: useCallback(
        (parentId, recycleData) => {
          if (!!document) {
            onDocumentChange(
              reinstateElementToPipeline(document, parentId, recycleData)
            );
          }
        },
        [document]
      ),
      elementAdded: useCallback(
        (name, parentId, elementDefinition) => {
          if (!!document) {
            onDocumentChange(
              createNewElementInPipeline(
                document,
                parentId,
                elementDefinition,
                name
              )
            );
          }
        },
        [document]
      ),
      elementMoved: useCallback((itemToMove, destination) => {
        if (!!document) {
          onDocumentChange(
            moveElementInPipeline(document, itemToMove, destination)
          );
        }
      }, []),
      elementPropertyUpdated: useCallback(
        (element, name, propertyType, propertyValue) => {
          if (!!document) {
            onDocumentChange(
              setElementPropertyValueInPipeline(
                document,
                element,
                name,
                propertyType,
                propertyValue
              )
            );
          }
        },
        []
      ),
      elementPropertyRevertToDefault: useCallback((elementId, name) => {
        if (!!document) {
          onDocumentChange(revertPropertyToDefault(document, elementId, name));
        }
      }, []),
      elementPropertyRevertToParent: useCallback((elementId, name) => {
        if (!!document) {
          onDocumentChange(revertPropertyToParent(document, elementId, name));
        }
      }, [])
    }
  };
};

export default usePipelineState;
