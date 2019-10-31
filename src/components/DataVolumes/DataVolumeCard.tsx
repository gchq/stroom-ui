import * as React from "react";
import styled from "styled-components";
import { Popconfirm, Button, Card } from "antd";
import "antd/dist/antd.css";
import FsVolume from "./types/FsVolume";
import MinimalInput from "components/MinimalInput";
import { Radio, Progress, Tooltip } from "antd";

import { VolumeUseStatus } from "./types/VolumeUseStatus";

interface Props {
  volume: FsVolume;
  onDelete: (volume: FsVolume) => void;
  onChange: (volume: FsVolume) => void;
}

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

const Contents = styled.div`
  display: flex;
  flex-direction: row;
`;

const PathInput = styled(MinimalInput)`
  height: 1.8em;
  width: 20em;
`;

const ByteLimitInput = styled(MinimalInput)`
  height: 1.8em;
  width: 8em;
`;

const FieldDiv = styled.div`
  margin-left: 3em;
`;

const StatsDiv = styled.div`
  margin: 0.75em;
`;

const DataVolumeCard: React.FunctionComponent<Props> = ({
  volume,
  onDelete,
  onChange,
}) => {
  const StyledCard = styled(Card)`
    margin: 0.5em;
    width: 40.75em;
    margin-bottom: 1em;
  `;

  const { bytesFree, bytesUsed, bytesTotal } = volume.volumeState;
  const percent = Math.round((bytesUsed / bytesTotal) * 100);
  const status = percent < 95 ? "normal" : "exception";
  return (
    <StyledCard size="small" type="inner">
      <Contents>
        <StatsDiv>
          <Tooltip
            title={`Using ${bytesUsed} of ${bytesTotal} bytes, leaving ${bytesFree} bytes free.`}
          >
            <Progress
              type="circle"
              percent={percent}
              format={() => `${percent}%`}
              width={80}
              status={status}
            />
          </Tooltip>
        </StatsDiv>

        <FieldDiv>
          <Field>
            <Label>Path: </Label>
            <PathInput
              defaultValue={volume.path}
              onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                volume.path = event.target.value;
                onChange(volume);
              }}
            />
          </Field>

          <Field>
            <Label>Status:</Label>
            <Radio.Group
              defaultValue="0"
              value={volume.status}
              buttonStyle="solid"
              size="small"
            >
              {Object.keys(VolumeUseStatus).map(key => (
                <Radio.Button key={key} value={VolumeUseStatus[key]}>
                  {key}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Field>

          <Field>
            <Label>Byte limit:</Label>
            <ByteLimitInput
              type="number"
              defaultValue={volume.byteLimit}
              onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                volume.byteLimit = parseInt(event.target.value);
                onChange(volume);
              }}
            />
          </Field>
        </FieldDiv>
        <Popconfirm
          title="Delete this data volume?"
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
      </Contents>
    </StyledCard>
  );
};

export default DataVolumeCard;
