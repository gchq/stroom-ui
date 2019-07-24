import * as React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import DocRefIconHeader from "components/DocRefIconHeader";

import { StyledCard } from "./DraggableIndexVolumeCard";
import Button from "components/Button";

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

  const AddVolumeGroupCard = styled(StyledCard)`
    background-color: white;
    width: 15em;
    height: 4em;
    -webkit-box-shadow: 4px 4px 5px -1px rgba(0, 0, 0, 0.06);
    -moz-box-shadow: 4px 4px 5px -1px rgba(0, 0, 0, 0.06);
    box-shadow: 4px 4px 5px -1px rgba(0, 0, 0, 0.06);
  `;

  return (
    <Page className="page">
      <div className="page__header">
        <DocRefIconHeader text="Index Volumes" docRefType="Index" />
      </div>
      <Body className="page__body">
        <DragDropContext onDragEnd={onDragEnd}>
          {indexVolumeGroups.map(indexVolumeGroup => {
            return (
              <Droppable
                key={indexVolumeGroup.name}
                droppableId={indexVolumeGroup.name}
                direction="horizontal"
              >
                {(provided, snapshot) => (
                  <div
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

          <AddVolumeGroupCard>
            <Button
              text="Add volume group"
              icon="plus"
              onClick={() => onGroupAdd()}
            />
          </AddVolumeGroupCard>
        </DragDropContext>
      </Body>
    </Page>
  );
};

export default IndexVolumesSection;
