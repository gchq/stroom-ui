import { HasAuditInfo } from "src/components/DocumentEditors/api/explorer/types";

export interface NewIndexVolume {
  path: string;
  nodeName: string;
}

export interface IndexVolume extends HasAuditInfo {
  id: string; // it's a number on the server side, but so many things will be easier if we just treat as string in JS
  path: string;
  nodeName: string;
  bytesLimit: number;
  bytesUsed: number;
  bytesFree: number;
  bytesTotal: number;
  statusMs: number;
}
