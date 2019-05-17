export type DataStatus = "UNLOCKED" | "LOCKED" | "DELETED";

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

export interface FetchDataParams {
  metaId?: number;
  pageSize: number;
  pageOffset: number;
}

export interface PagedData {
  streamAttributeMaps: DataRow[];
  total: number;
}

export interface UseData {
  pagedData: PagedData;
  updatePagedData: (updates: Partial<PagedData>) => void;
  fetchParams: FetchDataParams;
  updateFetchParams: (updates: Partial<FetchDataParams>) => void;
  getDataForSelectedRow: () => void;
}
