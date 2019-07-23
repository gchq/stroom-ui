import { HasAuditInfo } from "components/DocumentEditors/api/explorer/types";

export interface NewIndexVolume {
  path?: string;
  nodeName?: string;
  indexVolumeGroupId: number;
}

export interface IndexVolume extends HasAuditInfo {
  id: string;
  indexVolumeGroupId: number;
  path: string;
  nodeName: string;
  bytesLimit: number;
  bytesUsed: number;
  bytesFree: number;
  bytesTotal: number;
  statusMs: number;
}
