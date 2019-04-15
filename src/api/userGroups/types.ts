import { HasUuid } from "src/types";

export interface StroomUser extends HasUuid {
  name: string;
  group: boolean;
}

export interface StoreState {
  allUsers: StroomUser[];
  usersInGroup: {
    [s: string]: StroomUser[];
  };
  groupsForUser: {
    [s: string]: StroomUser[];
  };
}
