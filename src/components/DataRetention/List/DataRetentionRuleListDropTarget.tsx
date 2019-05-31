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
  position: number;
  moveRule: (ruleNumber: number, newPosition: number) => void;
}

interface EnhancedProps extends Props, DropCollectedProps {}

const dropTarget: DropTargetSpec<Props> = {
  canDrop({ position }, monitor) {
    const { ruleNumber } = monitor.getItem();
    const cannotDrop = position == ruleNumber || position == ruleNumber - 1;
    return !cannotDrop;
  },
  drop({ position, moveRule }, monitor) {
    const { ruleNumber } = monitor.getItem();
    moveRule(ruleNumber, position);
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
> = ({ connectDropTarget, draggingItemType, isOver, canDrop }) => {
  const showTarget =
    draggingItemType === DragDropTypes.RULE && isOver && canDrop;
  return connectDropTarget(
    <div className="DataRetentionRuleListDropTarget">
      {showTarget ? (
        <div className="DataRetentionRuleListDropTarget--highlighted" />
      ) : (
        undefined
      )}
    </div>,
  );
};

export default enhance(DataRetentionRuleListDropTarget);
