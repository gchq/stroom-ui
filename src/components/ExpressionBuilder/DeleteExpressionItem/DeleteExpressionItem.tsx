import * as React from "react";

import { ThemedConfirm } from "src/components/ThemedConfirm";
import { ExpressionItem } from "../types";

interface Props {
  isOpen: boolean;
  onCloseDialog: () => void;
  expressionItem?: ExpressionItem;
  onDeleteExpressionItem: (expressionItem: ExpressionItem) => void;
}

const DeletePipelineExpressionItem: React.FunctionComponent<Props> = ({
  isOpen,
  onCloseDialog,
  expressionItem,
  onDeleteExpressionItem,
}) => {
  return (
    <ThemedConfirm
      isOpen={isOpen}
      question={`Delete ${expressionItem} from expression?`}
      onCloseDialog={onCloseDialog}
      onConfirm={() => {
        if (!!expressionItem) {
          onDeleteExpressionItem(expressionItem);
        }
        onCloseDialog();
      }}
    />
  );
};

interface UseDialog {
  componentProps: Props;
  showDialog: (_expressionItem: ExpressionItem) => void;
}

export const useDialog = (
  onDeleteExpressionItem: (e: ExpressionItem) => void,
): UseDialog => {
  const [expressionItem, setExpressionItem] = React.useState<
    ExpressionItem | undefined
  >(undefined);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return {
    componentProps: {
      onDeleteExpressionItem,
      expressionItem,
      isOpen,
      onCloseDialog: () => {
        setIsOpen(false);
        setExpressionItem(undefined);
      },
    },
    showDialog: _expressionItem => {
      setIsOpen(true);
      setExpressionItem(_expressionItem);
    },
  };
};

export default DeletePipelineExpressionItem;
