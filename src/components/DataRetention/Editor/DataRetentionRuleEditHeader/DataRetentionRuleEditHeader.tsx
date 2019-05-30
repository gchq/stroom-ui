import * as React from "react";
import {
  DragSourceSpec,
  DragSourceCollector,
  ConnectDragSource,
  DragSource,
} from "react-dnd";
import { DataRetentionRule } from "components/DataRetention/types/DataRetentionRule";
import { DragDropTypes } from "../../types/DragDropTypes";
import InlineInput from "components/InlineInput/InlineInput";
import { Switch, Button, Popconfirm, Tooltip } from "antd";
import { MouseEventHandler } from "react-select/lib/types";

interface Props {
  rule: DataRetentionRule;
  handleNameChange: React.ChangeEventHandler<HTMLInputElement>;
  handleDelete: MouseEventHandler;
  handleEnabledChange: (checked: boolean, event: MouseEvent) => any;
}

interface DragCollectedProps {
  connectDragSource: ConnectDragSource;
  isDragging: boolean;
}
const dragSource: DragSourceSpec<Props, DataRetentionRule> = {
  beginDrag(props) {
    return { ...props.rule };
  },
};

const dragCollect: DragSourceCollector<DragCollectedProps, Props> = (
  connect,
  monitor,
) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

interface EnhancedProps extends Props, DragCollectedProps {}

const enhance = DragSource<Props, DragCollectedProps>(
  DragDropTypes.RULE,
  dragSource,
  dragCollect,
);

const DataRetentionRuleEditHeader: React.FunctionComponent<EnhancedProps> = ({
  rule,
  handleNameChange,
  handleDelete,
  handleEnabledChange,
  connectDragSource,
}) => {
  return connectDragSource(
    <div className="DataRetentionRuleEditor__header">
      <InlineInput value={rule.name} onChange={handleNameChange} />
      <div className="DataRetentionRuleEditor__header__actions">
        <Popconfirm
          title="Delete this retention rule?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
          placement="left"
        >
          <Button shape="circle" icon="delete" type="danger" />
        </Popconfirm>
        <Tooltip placement="rightBottom" title="Enabled/disable this rule">
          <Switch
            size="small"
            checked={rule.enabled}
            onChange={handleEnabledChange}
            defaultChecked
          />
        </Tooltip>
      </div>
    </div>,
  );
};

export default enhance(DataRetentionRuleEditHeader);
