import * as React from "react";

import DocRefIconHeader from "components/DocRefIconHeader";
import { IndexVolume } from "./indexVolumeApi";
import {
  IndexVolumeGroup,
  IndexVolumeGroupMembership,
} from "./indexVolumeGroupApi";
import styled from "styled-components";
import IndexVolumeGroupEditor from "./IndexVolumeGroupEditor";

interface Props {
  indexVolumes: IndexVolume[];
  indexVolumeGroups: IndexVolumeGroup[];
  indexVolumeGroupMemberships: IndexVolumeGroupMembership[];
  onVolumeMove: (
    volumeId: string,
    sourceVolumeGroupName: string,
    destinationVolumeGroupName: string,
  ) => void;
  onGroupDelete: (groupName: string) => void;
  onGroupAdd: () => void;
  onGroupChange: (groupName: string) => void;
  onVolumeAdd: (destinationGroupName: string) => void;
  onVolumeChange: (indexVolume: IndexVolume) => void;
  onVolumeDelete: (indexVolumeId: string) => void;
}

const IndexVolumesSection: React.FunctionComponent<Props> = ({
  indexVolumes,
  indexVolumeGroups,
  indexVolumeGroupMemberships,
  onVolumeMove,
  onGroupDelete,
  onGroupAdd,
  onGroupChange,
  onVolumeAdd,
  onVolumeChange,
  onVolumeDelete,
}) => {
  const Page = styled.div``;

  const Body = styled.div`
    padding: 1em;
  `;

  return (
    <Page className="page">
      <div className="page__header">
        <DocRefIconHeader text="Index Volumes" docRefType="Index" />
      </div>
      <Body className="page__body">
        <IndexVolumeGroupEditor
          indexVolumes={indexVolumes}
          indexVolumeGroups={indexVolumeGroups}
          indexVolumeGroupMemberships={indexVolumeGroupMemberships}
          onVolumeMove={onVolumeMove}
          onGroupAdd={onGroupAdd}
          onVolumeAdd={onVolumeAdd}
        />
      </Body>
    </Page>
  );
};

export default IndexVolumesSection;
