import styled from "styled-components";
import { Popconfirm, Button, Card } from "antd";
import "antd/dist/antd.css";
import DocRefImage from "../DocRefImage";
import { DataVolume } from "./DataVolume";
import MinimalInput from "components/MinimalInput";

interface Props {
  volume: DataVolume
  onDelete: (volume: DataVolume) => void;
  onChange: (volume: DataVolume) => void;
}

const TopRightButtons = styled.div`
  float: right;
  visibility: hidden;
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
const DataVolumeCard: React.FunctionComponent<Props> = ({
  volume,
  onDelete,
  onChange,
}) => {
  const StyledCard = styled(Card)`
    margin: 0.5em;
  `;
  return (
    <StyledCard
      size="small"
      type="inner"
      title="Index volume"
      extra={
        <Popconfirm
          title="Delete this index volume?"
          onConfirm={() => onDelete(volume)}
          okText="Yes"
          cancelText="No"
          placement="left"
        >
          <Button
            ghost
            type="danger"
            shape="circle"
            icon="delete"
            size="small"
          />
        </Popconfirm>
      }
    >
      <TopRightButtons>
        <Popconfirm
          title="Delete this index volume?"
          onConfirm={() => onDelete(volume)}
          okText="Yes"
          cancelText="No"
          placement="left"
        >
          <Button type="danger" shape="circle" icon="delete" size="small" />
        </Popconfirm>
      </TopRightButtons>
      <Contents>
        <IconColumn>
          <DocRefImage docRefType="Index" size="lg" />
        </IconColumn>
        <div>
          <Field>
            <Label>Stream</Label>
            <p>TODO: How should we represent StreamID?</p>
          </Field>
          <Field>
            <Label>Path: </Label>
            <StyledMinimalInput
              defaultValue={volume.volumePath}
              onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                volume.volumePath = event.target.value;
                onChange(volume);
              }}
            />
          </Field>
        </div>
      </Contents>
    </StyledCard>
  );
};

export default DataVolumeCard;
