import * as React from "react";
import { Card } from "antd";
import styled from "styled-components";
import DocRefImage from "../DocRefImage";
import { IndexVolume } from "./indexVolumeApi";
import InlineInput from "components/InlineInput/InlineInput";

interface Props {
  indexVolume: IndexVolume;
}

const IndexVolumeCard: React.FunctionComponent<Props> = ({ indexVolume }) => {
  var StyledCard = styled(Card)`
    width: 24em;
    cursor: grab;
    margin-right: 1em;
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
    <StyledCard size="small">
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

export default IndexVolumeCard;
