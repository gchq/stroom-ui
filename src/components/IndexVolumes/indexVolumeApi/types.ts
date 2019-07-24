import { HasAuditInfo } from "components/DocumentEditors/api/explorer/types";

export interface NewIndexVolume {
  path?: string;
  nodeName?: string;
  indexVolumeGroupId: string;
}

export interface IndexVolume extends HasAuditInfo {
  id: string;
  indexVolumeGroupId: string;
  path: string;
  nodeName: string;
  bytesLimit: number;
  bytesUsed: number;
  bytesFree: number;
  bytesTotal: number;
  statusMs: number;
}

export interface UpdateIndexVolumeDTO {
  id: string;
  indexVolumeGroupId: string;
  path: string;
  nodeName: string;
}
