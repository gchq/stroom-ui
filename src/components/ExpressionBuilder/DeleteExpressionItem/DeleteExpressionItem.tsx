import * as React from "react";

import { ThemedConfirm } from "../../ThemedConfirm";

interface Props {
  isOpen: boolean;
  onCloseDialog: () => void;
  expressionItemId?: string;
  onDeleteExpressionItem: (expressionItemId: string) => void;
}

const DeletePipelineExpressionItem: React.FunctionComponent<Props> = ({
  isOpen,
  onCloseDialog,
  expressionItemId,
  onDeleteExpressionItem,
}) => {
  return (
    <ThemedConfirm
      isOpen={isOpen}
      question={`Delete ${expressionItemId} from expression?`}
      onCloseDialog={onCloseDialog}
      onConfirm={() => {
        if (!!expressionItemId) {
          onDeleteExpressionItem(expressionItemId);
        }
        onCloseDialog();
      }}
    />
  );
};

interface UseDialog {
  componentProps: Props;
  showDialog: (_expressionItemId: string) => void;
}

export const useDialog = (
  onDeleteExpressionItem: (e: string) => void,
): UseDialog => {
  const [expressionItemId, setExpressionItemId] = React.useState<
    string | undefined
  >(undefined);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return {
    componentProps: {
      onDeleteExpressionItem,
      expressionItemId,
      isOpen,
      onCloseDialog: () => {
        setIsOpen(false);
        setExpressionItemId(undefined);
      },
    },
    showDialog: _expressionItemId => {
      setIsOpen(true);
      setExpressionItemId(_expressionItemId);
    },
  };
};

export default DeletePipelineExpressionItem;
