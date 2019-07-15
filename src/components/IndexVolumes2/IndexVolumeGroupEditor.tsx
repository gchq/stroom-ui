import * as React from "react";
// import { Card } from "antd";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { IndexVolume } from "./indexVolumeApi";
import {
  IndexVolumeGroup,
  IndexVolumeGroupMembership,
} from "./indexVolumeGroupApi";
import IndexVolumeCard from "./IndexVolumeCard";
import DraggableIndexVolumeCard from "./DraggableIndexVolumeCard";
import move from "ramda/es/move";

interface Props {
  indexVolumeGroups: IndexVolumeGroup[];
  indexVolumes: IndexVolume[];
  indexVolumeGroupMemberships: IndexVolumeGroupMembership[];
  onGroupChange: (
    volumeId: string,
    sourceVolumeGroupName: string,
    destinationVolumeGroupName: string,
  ) => void;
}

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "rgba(144,202,249,0.3)" : "white",
  border: "0.1em solid lightgrey",
  width: "100%",
  padding: "1em",
  marginBottom: "1.5em",
  // padding: grid,
  // width: 250,
});

const IndexVolumeGroupEditor: React.FunctionComponent<Props> = ({
  indexVolumes,
  indexVolumeGroups,
  indexVolumeGroupMemberships,
  onGroupChange,
}) => {
  const onDragEnd = (result: DropResult) => {
    console.log({ result });
    if (!result.destination) {
      console.log("Not dopped anywhere");
      return;
    }

    if (result.destination.droppableId === result.source.droppableId) {
      console.log("Dropped in it's own list");
      return;
    }

    onGroupChange(
      result.draggableId,
      result.source.droppableId,
      result.destination.droppableId,
    );
  };

  var GroupTitle = styled.div`
    margin-bottom: 0.5em;
    font-size: 1.25em;
  `;

  const List = styled.div`
    display: flex;
    flex-direction: row;
  `;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {indexVolumeGroups.map((indexVolumeGroup, index) => {
        return (
          <Droppable
            key={index}
            droppableId={indexVolumeGroup.name}
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <div>
                  <GroupTitle>{indexVolumeGroup.name}</GroupTitle>
                  <List>
                    {indexVolumes.map((indexVolume, index) => {
                      const found = indexVolumeGroupMemberships.find(
                        ivgm =>
                          ivgm.groupName === indexVolumeGroup.name &&
                          ivgm.volumeId === indexVolume.id,
                      );
                      return found ? (
                        <Draggable
                          key={indexVolume.id}
                          draggableId={indexVolume.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <DraggableIndexVolumeCard
                              provided={provided}
                              snapshot={snapshot}
                              key={indexVolume.id}
                              indexVolume={indexVolume}
                            />
                          )}
                        </Draggable>
                      ) : (
                        undefined
                      );
                    })}
                  </List>
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        );
      })}
    </DragDropContext>
  );
};

export default IndexVolumeGroupEditor;
