import { StreamTaskType } from "../../types";
import { SortByOptions, Directions } from "./enums";

export interface StoreState {
  trackers: Array<StreamTaskType>;
  isLoading: boolean;
  showCompleted: boolean;
  sortBy?: SortByOptions;
  sortDirection: Directions;
  pageSize: number;
  pageOffset: number;
  searchCriteria: string;
  totalTrackers: number;
  numberOfPages: number;
  selectedTrackerId?: number;
}
