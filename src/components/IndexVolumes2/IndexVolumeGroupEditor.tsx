import * as React from "react";
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
import DraggableIndexVolumeCard, {
  StyledCard,
} from "./DraggableIndexVolumeCard";
import Button from "components/Button";

interface Props {
  indexVolumeGroups: IndexVolumeGroup[];
  indexVolumes: IndexVolume[];
  indexVolumeGroupMemberships: IndexVolumeGroupMembership[];
  onVolumeMove: (
    volumeId: string,
    sourceVolumeGroupName: string,
    destinationVolumeGroupName: string,
  ) => void;
  onVolumeAdd: (destinationGroupName: string) => void;
  onGroupAdd: () => void;
}

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "rgba(144,202,249,0.3)" : "white",
  border: "0.1em solid lightgrey",
  width: "100%",
  paddingTop: "1em",
  paddingRight: "1em",
  paddingLeft: "1em",
  paddingBottom: "0.6em",
  marginBottom: "1.5em",
});

const IndexVolumeGroupEditor: React.FunctionComponent<Props> = ({
  indexVolumes,
  indexVolumeGroups,
  indexVolumeGroupMemberships,
  onVolumeMove,
  onVolumeAdd,
  onGroupAdd,
}) => {
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

  var GroupTitle = styled.div`
    margin-bottom: 0.5em;
    font-size: 1.25em;
  `;

  const List = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  `;
  const AddVolumeCard = styled(StyledCard)`
    width: 10em;
  `;
  const AddVolumeGroupCard = styled(StyledCard)`
    width: 15em;
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
                      console.log("PRINTING VOLS");
                      console.log({ indexVolume });
                      console.log({ indexVolumeGroupMemberships });
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
                    <AddVolumeCard>
                      <Button
                        text="Add volume"
                        icon="plus"
                        onClick={() => onVolumeAdd(indexVolumeGroup.name)}
                      />
                    </AddVolumeCard>
                    {provided.placeholder}
                  </List>
                </div>
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
  );
};

export default IndexVolumeGroupEditor;
