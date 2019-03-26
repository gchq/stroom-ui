import { DocRefTree } from "../../types";

export interface SearchProps {
  term?: string;
  docRefType?: string;
  pageOffset?: number;
  pageSize?: number;
}

export type StoreState = DocRefTree;
