import * as React from "react";
import styled from "styled-components";
import DocRefImage from "../DocRefImage";
import { IndexVolume } from "./indexVolumeApi";
import InlineInput from "components/InlineInput/InlineInput";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { Component } from "react";

interface Props {
  indexVolume: IndexVolume;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  background: isDragging ? "rgba(255, 143, 0, 0.2)" : "white",
  border: isDragging ? "1 solid lightgrey" : "1 solid blue",
  ...draggableStyle,
});

export const StyledCard = styled.div`
  width: 24em;
  cursor: grab;
  margin-right: 1em;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
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

/**
 * This has to be a class component instead of a functional component
 * because we need to use a 'ref' for BeautifulDnd to be able to handle drops.
 */
class DraggableIndexVolumeCard extends Component<Props> {
  render() {
    const { indexVolume, provided, snapshot } = this.props;
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
  }
}

export default DraggableIndexVolumeCard;
