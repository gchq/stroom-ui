import * as React from "react";
import styled from "styled-components";
import { Popconfirm, Button, Card } from "antd";
import "antd/dist/antd.css";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { IndexVolume } from "./indexVolumeApi";
import DraggableIndexVolumeCard, {
  StyledCard,
} from "./DraggableIndexVolumeCard";
import MinimalInput from "./MinimalInput";
import { IndexVolumeGroup } from "./indexVolumeGroupApi";

var StyledMinimalInput = styled(MinimalInput)`
  margin-bottom: 0.5em;
  font-size: 1.25em;
  height: 2em;
`;
const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const AddVolumeCard = styled(StyledCard)`
  background-color: white;
  width: 10em;
  height: 4em;
  -webkit-box-shadow: 4px 4px 5px -1px rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 4px 4px 5px -1px rgba(0, 0, 0, 0.06);
  box-shadow: 4px 4px 5px -1px rgba(0, 0, 0, 0.06);
`;

interface Props {
  indexVolumeGroup: IndexVolumeGroup;
  indexVolumes: IndexVolume[];
  provided: DroppableProvided;
  onGroupChange: (indexVolumeGroup: IndexVolumeGroup) => void;
  onGroupDelete: (id: string) => void;
  onVolumeAdd: (indexVolumeGroupId: string) => void;
  onVolumeChange: (indexVolume: IndexVolume) => void;
  onVolumeDelete: (indexVolumeId: string) => void;
}
const IndexVolumeGroupCard: React.FunctionComponent<Props> = ({
  indexVolumeGroup,
  indexVolumes,
  provided,
  onGroupChange,
  onGroupDelete,
  onVolumeAdd,
  onVolumeChange,
  onVolumeDelete,
}) => {
  return (
    <Card
      title={
        <StyledMinimalInput
          defaultValue={indexVolumeGroup.name}
          onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
            indexVolumeGroup.name = event.target.value;
            onGroupChange(indexVolumeGroup);
          }}
        />
      }
      size="small"
      extra={
        <span>
          <Button
            icon="plus"
            size="small"
            onClick={() => onVolumeAdd(indexVolumeGroup.id)}
          >
            Add volume
          </Button>
          <Popconfirm
            title="Delete this index volume group and all its index volumes?"
            onConfirm={() => onGroupDelete(indexVolumeGroup.id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <Button type="danger" shape="circle" icon="delete" size="small" />
          </Popconfirm>
        </span>
      }
    >
      <List>
        {indexVolumes
          .filter(
            indexVolume =>
              indexVolume.indexVolumeGroupId === indexVolumeGroup.id,
          )
          .map((indexVolume, index) => (
            <Draggable
              key={indexVolume.id}
              draggableId={indexVolume.id}
              index={index}
            >
              {(provided, snapshot) => (
                <DraggableIndexVolumeCard
                  provided={provided}
                  snapshot={snapshot}
                  indexVolume={indexVolume}
                  onDelete={onVolumeDelete}
                  onChange={onVolumeChange}
                />
              )}
            </Draggable>
          ))}
        {provided.placeholder}
      </List>
    </Card>
  );
};

export default IndexVolumeGroupCard;
