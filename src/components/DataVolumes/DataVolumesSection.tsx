import { Button, Empty } from "antd";
import DocRefIconHeader from "components/DocRefIconHeader";
import * as React from "react";
import styled from "styled-components";
import DataVolumeCard from "./DataVolumeCard";
import FsVolume from "./types/FsVolume";

interface Props {
  volumes: FsVolume[];
  onVolumeAdd: () => void;
  onVolumeChange: (volume: FsVolume) => void;
  onVolumeDelete: (volume: FsVolume) => void;
}

const IndexVolumesSection: React.FunctionComponent<Props> = ({
  volumes,
  onVolumeAdd,
  onVolumeChange,
  onVolumeDelete,
}) => {
  if (!volumes) {
    volumes = [];
  }
  const Page = styled.div``;

  const Body = styled.div`
    padding: 1em;
  `;

  return (
    <Page className="page">
      <div className="page__header">
        <DocRefIconHeader text="Index Volumes" docRefType="Index" />
        <div className="page__buttons">
          <Button icon="plus" onClick={() => onVolumeAdd()}>
            Add data volume
          </Button>
        </div>
      </div>
      <Body className="page__body">
        {volumes.length === 0 ? (
          <Empty
            description="No data volumes"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button icon="plus" size="small" onClick={() => onVolumeAdd()}>
              Add data volume
            </Button>
          </Empty>
        ) : (
          undefined
        )}
        {volumes.map(volume => {
          return (
            <DataVolumeCard
              key={volume.id}
              volume={volume}
              onDelete={onVolumeDelete}
              onChange={onVolumeChange}
            />
          );
        })}
      </Body>
    </Page>
  );
};

export default IndexVolumesSection;
