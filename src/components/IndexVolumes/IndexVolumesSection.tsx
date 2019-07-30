import * as React from "react";
import styled from "styled-components";
import { Button, Empty } from "antd";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import DocRefIconHeader from "components/DocRefIconHeader";

import { IndexVolume } from "./indexVolumeApi";
import { IndexVolumeGroup } from "./indexVolumeGroupApi";
import IndexVolumeGroupCard from "./IndexVolumeGroupCard";

interface Props {
  indexVolumes: IndexVolume[];
  indexVolumeGroups: IndexVolumeGroup[];
  onVolumeMove: (
    volumeId: string,
    sourceVolumeGroupName: string,
    destinationVolumeGroupName: string,
  ) => void;
  onGroupDelete: (id: string) => void;
  onGroupAdd: () => void;
  onGroupChange: (indexVolumeGroup: IndexVolumeGroup) => void;
  onVolumeAdd: (indexVolumeGroupId: string) => void;
  onVolumeChange: (indexVolume: IndexVolume) => void;
  onVolumeDelete: (indexVolumeId: string) => void;
}

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "rgba(144,202,249,0.3)" : "white",
  width: "100%",
});

const IndexVolumesSection: React.FunctionComponent<Props> = ({
  indexVolumes,
  indexVolumeGroups,
  onVolumeMove,
  onGroupDelete,
  onGroupAdd,
  onGroupChange,
  onVolumeAdd,
  onVolumeChange,
  onVolumeDelete,
}) => {
  if (!indexVolumes) {
    indexVolumes = [];
  }
  if (!indexVolumeGroups) {
    indexVolumeGroups = [];
  }
  const Page = styled.div``;

  const Body = styled.div`
    padding: 1em;
  `;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === result.source.droppableId) {
      return;
    }

    onVolumeMove(
      result.draggableId,
      result.source.droppableId,
      result.destination.droppableId,
    );
  };

  return (
    <Page className="page">
      <div className="page__header">
        <DocRefIconHeader text="Index Volumes" docRefType="Index" />
        <div className="page__buttons">
          <Button icon="plus" onClick={() => onGroupAdd()}>
            Add index volume group
          </Button>
        </div>
      </div>
      <Body className="page__body">
        <DragDropContext onDragEnd={onDragEnd}>
             {indexVolumeGroups.length === 0 ? (
            <Empty
              description="No index volumes groups"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button icon="plus" size="small" onClick={() => onGroupAdd()}>
                Add index volume group
              </Button>
            </Empty>
          ) : (
            undefined
          )}
          {indexVolumeGroups.map(indexVolumeGroup => {
            return (
              <Droppable
                key={"droppable_" + indexVolumeGroup.id}
                droppableId={"droppable_" + indexVolumeGroup.id}
                direction="horizontal"
              >
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    <IndexVolumeGroupCard
                      indexVolumeGroup={indexVolumeGroup}
                      indexVolumes={indexVolumes}
                      onGroupDelete={onGroupDelete}
                      onGroupChange={onGroupChange}
                      onVolumeAdd={onVolumeAdd}
                      onVolumeDelete={onVolumeDelete}
                      onVolumeChange={onVolumeChange}
                      provided={provided}
                    />
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </Body>
    </Page>
  );
};

export default IndexVolumesSection;
