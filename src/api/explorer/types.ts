import { DocRefTree, DocRefInfoType } from "../../types";

export interface StoreState {
  waitingForTree: boolean;
  documentTree: DocRefTree;
  docRefInfoByUuid: {
    [s: string]: DocRefInfoType;
  };
  docRefTypes: Array<string>;
}
export interface SearchProps {
  term?: string;
  docRefType?: string;
  pageOffset?: number;
  pageSize?: number;
}