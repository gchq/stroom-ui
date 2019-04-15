import { DocRefType } from "src/api/useDocumentApi/types/base";
import { ExpressionOperatorType } from "src/components/ExpressionBuilder/types";

export interface HasUuid {
  uuid: string;
}

export interface HasAuditInfo {
  createTimeMs: number;
  updateTimeMs: number;
  createUser: string;
  updateUser: string;
}

export interface IndexVolumeGroup extends HasAuditInfo {
  name: string;
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

export interface IndexVolumeGroupMembership {
  volumeId: string;
  groupName: string;
}

export interface DocRefType extends HasUuid {
  type: string;
  name?: string;
}

export const copyDocRef = (input: DocRefType): DocRefType => {
  return {
    uuid: input.uuid,
    type: input.type,
    name: input.name,
  };
};

export interface DocRefInfoType {
  docRef: DocRefType;
  createTime: number;
  updateTime: number;
  createUser: string;
  updateUser: string;
  otherInfo: string;
}

export interface Tree<T> {
  children?: (T & Tree<T>)[];
}

export interface TWithLineage<T extends HasUuid> {
  node: Tree<T> & T;
  lineage: T[];
}

export interface SelectOptionType {
  value: string;
  label: string;
}

export type SelectOptionsType = SelectOptionType[];

export interface OptionType {
  label: string;
  value: string;
}

export interface ControlledInput<T> {
  onChange: (value: T) => any;
  value: T;
}

export interface PageRequest {
  pageOffset?: number;
  pageSize?: number;
}

export interface PageResponse {
  offset: number;
  length: number;
  total: number;
  exact: boolean;
}

export type DataStatus = "UNLOCKED" | "LOCKED" | "DELETED";

export interface DataItem {
  id: number;
  feedName: string;
  typeName: string;
  pipelineUuid: string;
  parentDataId: number;
  processTaskId: number;
  processorId: number;
  status: DataStatus;
  statusMs: number;
  createMs: number;
  effectiveMs: number;
}

export interface DataRow {
  meta: DataItem;
  attributes?: {
    [key: string]: string;
  };
}

export interface StreamAttributeMapResult {
  pageResponse: PageResponse;
  streamAttributeMaps: DataRow[];
}

export enum PermissionInheritance {
  NONE = "None",
  SOURCE = "Source",
  DESTINATION = "Destination",
  COMBINED = "Combined",
}

export interface OffsetRange {
  offset: number;
  length: number;
}
export interface RowCount {
  count: number;
  exact: boolean;
}

export interface AbstractFetchDataResult {
  streamType: string;
  classification: string;
  streamRange: OffsetRange;
  streamRowCount: RowCount;
  pageRange: OffsetRange;
  pageRowCount: RowCount;
  availableChildStreamType: string[];
}

export type Severity = "INFO" | "WARN" | "ERROR" | "FATAL";

export interface Marker {
  severity: Severity;
}
export interface FetchMarkerResult extends AbstractFetchDataResult {
  markers: Marker[];
}

export interface FetchDataResult extends AbstractFetchDataResult {
  data: string;
  html: boolean;
}

export interface LimitsType {
  streamCount: number;
  eventCount: number;
  durationMs: number;
}

export interface QueryDataType {
  dataSource: DocRefType;
  expression: ExpressionOperatorType;
  limits?: LimitsType;
}

export interface StreamTaskType {
  // Most important data, probably
  filterName: string;
  pipelineName: string;
  pipelineId: number;
  trackerMs: number;
  trackerPercent: number;
  lastPollAge: string;
  taskCount: number;
  priority: number;
  streamCount: number;
  eventCount: number;
  status: string;
  enabled: boolean;
  filter: QueryDataType;

  // supporting data
  filterId?: number;
  createUser?: string;
  createdOn?: number;
  updateUser?: string;
  updatedOn?: number;
  minStreamId?: number;
  minEventId?: number;
}

export interface StreamTasksResponseType {
  streamTasks: StreamTaskType[];
  totalStreamTasks: number;
}

export interface StyledComponentProps {
  className?: string;
}

export enum Direction {
  UP = "up",
  DOWN = "down",
}
