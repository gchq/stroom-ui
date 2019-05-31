import * as React from "react";
import { DragDropTypes } from "../types/DragDropTypes";
import {
  DropTarget,
  DropTargetSpec,
  DropTargetCollector,
  ConnectDropTarget,
} from "react-dnd";

export interface DropCollectedProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  draggingItemType?: string | null | symbol;
  canDrop: boolean;
}

interface Props {
  foobar: string;
}

interface EnhancedProps extends Props, DropCollectedProps {}

const dropTarget: DropTargetSpec<Props> = {
  canDrop(wat) {
    console.log({ wat });
    return true;
  },
  drop(dropEvent, monitor) {
    console.log({ dropEvent });
    console.log({ monitor });
  },
};

const dropCollect: DropTargetCollector<DropCollectedProps, Props> = (
  connect,
  monitor,
) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  draggingItemType: monitor.getItemType(),
  canDrop: monitor.canDrop(),
});

const enhance = DropTarget<Props, DropCollectedProps>(
  [DragDropTypes.RULE],
  dropTarget,
  dropCollect,
);

const DataRetentionRuleListDropTarget: React.FunctionComponent<
  EnhancedProps
> = ({ connectDropTarget, draggingItemType, isOver }) => {
  return connectDropTarget(
    <div className="DataRetentionRuleListDropTarget">
      {draggingItemType === DragDropTypes.RULE && isOver ? (
        <div className="DataRetentionRuleListDropTarget--highlighted" />
      ) : (
        undefined
      )}
    </div>,
  );
};

export default enhance(DataRetentionRuleListDropTarget);
