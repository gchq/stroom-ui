import * as React from "react";

import DocRefIconHeader from "components/DocRefIconHeader";
import { IndexVolume } from "./indexVolumeApi";
import { IndexVolumeGroup } from "./indexVolumeGroupApi";

interface Props {
  indexVolumes: IndexVolume[];
  indexVolumeGroups: IndexVolumeGroup[];
}

const IndexVolumesSection: React.FunctionComponent<Props> = ({
  indexVolumes,
  indexVolumeGroups,
}) => {
  return (
    <div className="page">
      <div className="page__header">
        <DocRefIconHeader text="Index Volumes" docRefType="Index" />
      </div>
      <div className="page__body">
        {indexVolumes}
        {indexVolumeGroups}
        <ul>
          <li>Index volume group</li>
          <li>Index volume group</li>
          <li>Index volume group</li>
          <li>Index volume group</li>
          <li>Index volume group</li>
        </ul>
      </div>
    </div>
  );
};

export default IndexVolumesSection;
