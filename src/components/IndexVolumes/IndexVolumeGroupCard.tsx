import * as React from "react";
import styled from "styled-components";
import { Popconfirm, Button, Card, Empty } from "antd";
import "antd/dist/antd.css";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { IndexVolume } from "./indexVolumeApi";
import DraggableIndexVolumeCard from "./DraggableIndexVolumeCard";
import MinimalInput from "./MinimalInput";
import { IndexVolumeGroup } from "./indexVolumeGroupApi";

var StyledMinimalInput = styled(MinimalInput)`
  margin-bottom: 0.5em;
  margin-right: 1em;
  font-size: 1.25em;
  height: 2em;
`;
const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
  const indexVolumesInThisGroup = indexVolumes.filter(
    indexVolume => indexVolume.indexVolumeGroupId === indexVolumeGroup.id,
  );

  const StyledCard = styled(Card)`
    margin-bottom: 1em;
  `;

    const HeaderButtons = styled.span`
        margin-left: 1em;
        `;
  const HeaderButtonSpan = styled.span`
    margin-right: 1em;
  `;

  return (
    <StyledCard
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
        <HeaderButtons>
          <HeaderButtonSpan>
            <Button
              icon="plus"
              size="small"
              onClick={() => onVolumeAdd(indexVolumeGroup.id)}
            >
              Add index volume
            </Button>
          </HeaderButtonSpan>

          <Popconfirm
            title="Delete this index volume group and all its index volumes?"
            onConfirm={() => onGroupDelete(indexVolumeGroup.id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <Button type="danger" shape="circle" icon="delete" size="small" />
          </Popconfirm>
        </HeaderButtons>
      }
    >
      <List>
        {indexVolumesInThisGroup.length === 0 ? (
          <Empty
            description="No index volumes"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button
              icon="plus"
              size="small"
              onClick={() => onVolumeAdd(indexVolumeGroup.id)}
            >
              Add index volume
            </Button>
          </Empty>
        ) : (
          undefined
        )}
        {indexVolumesInThisGroup.map((indexVolume, index) => (
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
    </StyledCard>
  );
};

export default IndexVolumeGroupCard;
