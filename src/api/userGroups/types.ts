import { StroomUser } from "src/types";

export interface StoreState {
  allUsers: StroomUser[];
  usersInGroup: {
    [s: string]: StroomUser[];
  };
  groupsForUser: {
    [s: string]: StroomUser[];
  };
}
