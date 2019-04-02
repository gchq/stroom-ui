import * as React from "react";
import { useState, useCallback } from "react";

import { ThemedConfirm } from "src/components/ThemedConfirm";

interface Props {
  isOpen: boolean;
  onCloseDialog: () => void;
  elementId?: string;
  onDeleteElement: (elementId: string) => void;
}

const DeletePipelineElement = ({
  isOpen,
  onCloseDialog,
  elementId,
  onDeleteElement,
}: Props) => {
  const onConfirm = useCallback(() => {
    if (!!elementId) {
      onDeleteElement(elementId);
    }
    onCloseDialog();
  }, [elementId, onDeleteElement, onCloseDialog]);

  return (
    <ThemedConfirm
      isOpen={isOpen}
      question={`Delete ${elementId} from pipeline?`}
      onCloseDialog={onCloseDialog}
      onConfirm={onConfirm}
    />
  );
};

interface UseDialog {
  componentProps: Props;
  showDialog: (_elementId: string) => void;
}

export const useDialog = (onDeleteElement: (e: string) => void): UseDialog => {
  const [elementId, setElementId] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    componentProps: {
      onDeleteElement,
      elementId,
      isOpen,
      onCloseDialog: () => {
        setIsOpen(false);
        setElementId(undefined);
      },
    },
    showDialog: _elementId => {
      setIsOpen(true);
      setElementId(_elementId);
    },
  };
};

export default DeletePipelineElement;
