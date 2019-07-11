import * as React from "react";
import { Card } from "antd";
import styled from "styled-components";
import DocRefImage from "../DocRefImage";
import { IndexVolume } from "./indexVolumeApi";
import { IndexVolumeGroup } from "./indexVolumeGroupApi";
import InlineInput from "components/InlineInput/InlineInput";

interface Props {
  indexVolumeGroup: IndexVolumeGroup;
  indexVolumes: IndexVolume[];
}

const IndexVolumeGroupEditor: React.FunctionComponent<Props> = ({
  indexVolumes,
  indexVolumeGroup,
}) => {
  var StyledCard = styled(Card)`
    width: 24em;
    cursor: grab;
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

  const inlineInputWidth = 18;

  const { Meta } = Card;

  const StyledMeta = styled(Meta)`
    margin-bottom: 0.5em;
  `;
  return (
    <StyledCard size="small">
      <StyledMeta
        avatar={<DocRefImage docRefType="Index" />}
        title={indexVolumeGroup.name}
      />
      {indexVolumes.map(indexVolume => {
        return (
          <div key={indexVolume.id}>
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
        );
      })}
    </StyledCard>
  );
};

export default IndexVolumeGroupEditor;
