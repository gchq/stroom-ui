import * as React from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import DocRefIconHeader from "components/DocRefIconHeader";

import DraggableIndexVolumeCard, {
  StyledCard,
} from "./DraggableIndexVolumeCard";
import Button from "components/Button";

import { IndexVolume } from "./indexVolumeApi";
import { IndexVolumeGroup } from "./indexVolumeGroupApi";

interface Props {
  indexVolumes: IndexVolume[];
  indexVolumeGroups: IndexVolumeGroup[];
  onVolumeMove: (
    volumeId: string,
    sourceVolumeGroupName: string,
    destinationVolumeGroupName: string,
  ) => void;
  onGroupDelete: (groupName: string) => void;
  onGroupAdd: () => void;
  onGroupChange: (groupName: string) => void;
  onVolumeAdd: (indexVolumeGroupId: number) => void;
  onVolumeChange: (indexVolume: IndexVolume) => void;
  onVolumeDelete: (indexVolumeId: string) => void;
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
  boxShadow: "4px 4px 5px -1px rgba(0, 0, 0, 0.06)",
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
    background-color: white;
    width: 10em;
    height: 4em;
    -webkit-box-shadow: 4px 4px 5px -1px rgba(0, 0, 0, 0.06);
    -moz-box-shadow: 4px 4px 5px -1px rgba(0, 0, 0, 0.06);
    box-shadow: 4px 4px 5px -1px rgba(0, 0, 0, 0.06);
  `;
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
                    <div>
                      <GroupTitle>{indexVolumeGroup.name}</GroupTitle>
                      <List>
                        {indexVolumes
                          .filter(
                            indexVolume =>
                              indexVolume.indexVolumeGroupId ===
                              indexVolumeGroup.id,
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
                        <AddVolumeCard>
                          <Button
                            text="Add volume"
                            icon="plus"
                            onClick={() => onVolumeAdd(indexVolumeGroup.id)}
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
      </Body>
    </Page>
  );
};

export default IndexVolumesSection;
