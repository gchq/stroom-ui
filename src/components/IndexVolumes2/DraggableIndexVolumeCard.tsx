import * as React from "react";
import styled from "styled-components";
import DocRefImage from "../DocRefImage";
import { IndexVolume } from "./indexVolumeApi";
import InlineInput from "components/InlineInput/InlineInput";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

interface Props {
  indexVolume: IndexVolume;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: "white",
  background: isDragging ? "rgba(255, 143, 0, 0.2)" : "white",
  border: isDragging ? "1 solid lightgrey" : "1 solid blue",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const DraggableIndexVolumeCard: React.FunctionComponent<Props> = ({
  indexVolume,
  provided,
  snapshot,
}) => {
  var StyledCard = styled.div`
    width: 24em;
    cursor: grab;
    margin-right: 1em;
    border: 0.01em solid lightgrey;
    padding: 0.7em;
  `;

  const Field = styled.div`
    display: flex;
    flex-direction: row;
    text-align: right;
  `;

  const Label = styled.label`
    width: 5.8em;
    margin-right: 0.5em;
  `;

  const inlineInputWidth = 15;

  const Contents = styled.div`
    display: flex;
    flex-direction: row;
  `;

  const IconColumn = styled.div`
    padding-right: 1em;
    justify-content: center;
    align-items: center;
    display: flex;
  `;

  return (
    <StyledCard
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <Contents>
        <IconColumn>
          <DocRefImage docRefType="Index" size="lg" />
        </IconColumn>
        <div>
          <Field>
            <Label>Node name: </Label>
            <InlineInput
              value={indexVolume.nodeName}
              width={inlineInputWidth}
            />
          </Field>
          <Field>
            <Label>Path: </Label>
            <InlineInput value={indexVolume.path} width={inlineInputWidth} />
          </Field>
        </div>
      </Contents>
    </StyledCard>
  );
};

export default DraggableIndexVolumeCard;
