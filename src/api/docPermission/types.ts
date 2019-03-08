interface DocumentPermission {
  userUuid: string;
  docRefUuid: string;
  permissionNames: Array<string>;
}

export interface StoreState {
  permissionsByDocType: {
    [docType: string]: Array<string>;
  };
  permissions: Array<DocumentPermission>;
}
