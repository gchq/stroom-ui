import * as React from "react";
import styled from "styled-components";
import DocRefImage from "../DocRefImage";
import { IndexVolume } from "./indexVolumeApi";
import InlineInput from "components/InlineInput/InlineInput";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { Component } from "react";
import Button from "components/Button";

interface Props {
  indexVolume: IndexVolume;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  onDelete: (volumeId: string) => void;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  background: isDragging ? "rgba(255, 143, 0, 0.2)" : "white",
  border: isDragging ? "1 solid lightgrey" : "1 solid blue",
  boxShadow: "4px 4px 5px -1px rgba(0, 0, 0, 0.06)",
  ...draggableStyle,
});
const ActionColumn = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  visibility: hidden;
`;

export const StyledCard = styled.div`
  width: 24em;
  cursor: grab;
  margin-right: 1em;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  border: 0.01em solid lightgrey;
  padding: 0.7em;

  -webkit-box-shadow: 4px 4px 5px -1px rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 4px 4px 5px -1px rgba(0, 0, 0, 0.06);
  box-shadow: 4px 4px 5px -1px rgba(0, 0, 0, 0.06);

  :hover {
    border: 0.01em solid rgba(255, 143, 0, 0.8);
  }
  &:hover ${ActionColumn} {
    visibility: visible;
  }
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

const IconColumn = styled.div`
  padding-right: 1em;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
`;

/**
 * This has to be a class component instead of a functional component
 * because we need to use a 'ref' for BeautifulDnd to be able to handle drops.
 */
class DraggableIndexVolumeCard extends Component<Props> {
  render() {
    const { indexVolume, provided, snapshot, onDelete } = this.props;
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
          <ActionColumn>
            <Button
              appearance="icon"
              icon="trash"
              action="secondary"
              onClick={() => onDelete(indexVolume.id)}
            />
          </ActionColumn>
        </Contents>
      </StyledCard>
    );
  }
}

export default DraggableIndexVolumeCard;
