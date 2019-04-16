export interface HasUuid {
  uuid: string;
}

export interface HasAuditInfo {
  createTimeMs: number;
  updateTimeMs: number;
  createUser: string;
  updateUser: string;
}
