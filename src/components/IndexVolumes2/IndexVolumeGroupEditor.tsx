import * as React from "react";
import { Card } from "antd";

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
  return (
    <Card title={indexVolumeGroup.name} size="small">
      {indexVolumes.map(indexVolume => {
        return (
          <div key={indexVolume.id}>
            <div>
              <span>
                <label>Node name: </label>
                <InlineInput value={indexVolume.nodeName} />
              </span>
            </div>
            <div>
              <span>
                <label>Path: </label>
                <InlineInput value={indexVolume.path} />
              </span>
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default IndexVolumeGroupEditor;
