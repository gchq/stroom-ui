import { DocRefTree } from "../../types";

export interface StoreState {
  waitingForTree: boolean;
  documentTree: DocRefTree;
}
export interface SearchProps {
  term?: string;
  docRefType?: string;
  pageOffset?: number;
  pageSize?: number;
}
