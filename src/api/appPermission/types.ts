export interface StoreState {
  allAppPermissions: Array<string>;
  userAppPermissions: {
    [userUuid: string]: Array<string>;
  };
}