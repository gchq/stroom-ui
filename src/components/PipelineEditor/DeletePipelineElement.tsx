import * as React from "react";

import { ThemedConfirm } from "src/components/ThemedConfirm";

interface Props {
  isOpen: boolean;
  onCloseDialog: () => void;
  elementId?: string;
  onDeleteElement: (elementId: string) => void;
}

const DeletePipelineElement: React.FunctionComponent<Props> = ({
  isOpen,
  onCloseDialog,
  elementId,
  onDeleteElement,
}) => {
  return (
    <ThemedConfirm
      isOpen={isOpen}
      question={`Delete ${elementId} from pipeline?`}
      onCloseDialog={onCloseDialog}
      onConfirm={() => {
        if (!!elementId) {
          onDeleteElement(elementId);
        }
        onCloseDialog();
      }}
    />
  );
};

interface UseDialog {
  componentProps: Props;
  showDialog: (_elementId: string) => void;
}

export const useDialog = (onDeleteElement: (e: string) => void): UseDialog => {
  const [elementId, setElementId] = React.useState<string | undefined>(
    undefined,
  );
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

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
