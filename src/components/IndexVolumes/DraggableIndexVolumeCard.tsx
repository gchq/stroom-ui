import * as React from "react";
import styled from "styled-components";
import DocRefImage from "../DocRefImage";
import { IndexVolume } from "./indexVolumeApi";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import Button from "components/Button";
import MinimalInput from "./MinimalInput";

interface Props {
  indexVolume: IndexVolume;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  onDelete: (volumeId: string) => void;
  onChange: (indexVolume: IndexVolume) => void;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  background: isDragging ? "rgba(255, 143, 0, 0.2)" : "white",
  border: isDragging ? "1 solid lightgrey" : "1 solid blue",
  boxShadow: "4px 4px 5px -1px rgba(0, 0, 0, 0.06)",
  ...draggableStyle,
});

const ActionContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  visibility: hidden;
`;

export const StyledCard = styled.div`
  width: 30em;
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
  &:hover ${ActionContainer} {
    visibility: visible;
  }
`;

const Field = styled.div`
  height: 2.3em;
  display: flex;
  flex-direction: row;
  text-align: right;
`;

const Label = styled.label`
  width: 5.8em;
  margin-right: 0.5em;
  padding-top: 0.2em;
`;

const IconColumn = styled.div`
  padding-right: 1em;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledMinimalInput = styled(MinimalInput)`
  height: 1.8em;
  width: 13em;
`;

/**
 * This has to be a class component instead of a functional component
 * because we need to use a 'ref' for BeautifulDnd to be able to handle drops.
 */
const DraggableIndexVolumeCard: React.FunctionComponent<Props> = ({
  indexVolume,
  provided,
  snapshot,
  onDelete,
  onChange,
}) => {
  const providedInnerRef = React.useRef(provided.innerRef);

  return (
    <StyledCard
      ref={providedInnerRef.current}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <Contents>
        <IconColumn>
          <DocRefImage docRefType="Index" size="lg" />
          <ActionContainer>
            <Button
              appearance="icon"
              icon="trash"
              action="secondary"
              onClick={() => onDelete(indexVolume.id)}
            />
          </ActionContainer>
        </IconColumn>
        <div>
          <Field>
            <Label>Node name: </Label>
            <StyledMinimalInput
              defaultValue={indexVolume.nodeName}
              onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                indexVolume.nodeName = event.target.value;
                onChange(indexVolume);
              }}
            />
          </Field>
          <Field>
            <Label>Path: </Label>
            <StyledMinimalInput
              value={indexVolume.path}
              onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                indexVolume.path = event.target.value;
                onChange(indexVolume);
              }}
            />
          </Field>
        </div>
      </Contents>
    </StyledCard>
  );
};

export default DraggableIndexVolumeCard;
