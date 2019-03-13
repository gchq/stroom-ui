import { StreamTaskType } from "../../types";

export enum TrackerSelection {
  first = "first",
  last = "last",
  none = "none"
}
export enum Directions {
  ascending = "ascending",
  descending = "descending"
}
export enum SortByOptions {
  pipelineUuid = "pipelineUuid",
  pipelineName = "pipelineName",
  priority = "Priority",
  progress = "progress"
}

export const sortByFromString = (asStr: string): SortByOptions => {
  return SortByOptions.pipelineName;
};

export interface FetchParameters {
  pageOffset: number;
  pageSize: number;
  sortBy: SortByOptions;
  sortDirection: Directions;
  searchCriteria: string;
}
export interface PagedTrackerInfo {
  trackers: Array<StreamTaskType>;
  totalTrackers: number;
  numberOfPages: number;
}

export interface UseStreamTasks {
  selectedTrackerId?: number;
  fetchParameters: FetchParameters;
  pagedTrackerInfo: PagedTrackerInfo;
  updateFetchParameters: (params: Partial<FetchParameters>) => void;
  fetchTrackers: () => void;
  fetchMore: () => void;
  enableToggle: (filterId: number, isCurrentlyEnabled: boolean) => void;
  addTrackers: (
    streamTasks: Array<StreamTaskType>,
    totalStreamTasks: number
  ) => void;
  updateSort: (sortBy: SortByOptions, sortDirection: Directions) => void;
  updateTrackers: (
    streamTasks: Array<StreamTaskType>,
    totalStreamTasks: number
  ) => void;
  moveSelection: (direction: Directions) => void;
  updateEnabled: (filterId: number, enabled: boolean) => void;
  updateTrackerSelection: (filterId: number) => void;
  updateSearchCriteria: (searchCriteria: string) => void;
  changePage: (pageOffset: number) => void;
  updatePageSize: (pageSize: number) => void;
  resetPaging: () => void;
  pageRight: () => void;
  pageLeft: () => void;
  selectFirst: () => void;
  selectLast: () => void;
  selectNone: () => void;
}
