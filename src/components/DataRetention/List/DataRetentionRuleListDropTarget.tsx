import * as React from "react";
import { DragDropTypes } from "../types/DragDropTypes";
import { DropTarget, DropTargetSpec, DropTargetCollector } from "react-dnd";
import { DropCollectedProps } from "./DataRetentionRuleList";

interface Props {
  foobar: string;
}
interface EnhancedProps extends Props, DropCollectedProps {}
const dropTarget: DropTargetSpec<Props> = {
  canDrop() {
    return true;
  },
  drop({}, monitor) {
    //TODO
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
  return (
    <div>
      {draggingItemType === DragDropTypes.RULE ? (
        <div>
          <div>drop3</div>
          {isOver ? <div>drop4</div> : <div>drop5</div>}
        </div>
      ) : (
        <div>drop6</div>
      )}
    </div>
  );
};

export default enhance(DataRetentionRuleListDropTarget);
