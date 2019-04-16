export interface HasUuid {
  uuid: string;
}

export interface HasAuditInfo {
  createTimeMs: number;
  updateTimeMs: number;
  createUser: string;
  updateUser: string;
}

export interface Tree<T> {
  children?: (T & Tree<T>)[];
}

export interface TWithLineage<T extends HasUuid> {
  node: Tree<T> & T;
  lineage: T[];
}
