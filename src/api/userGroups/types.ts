import { HasUuid } from "src/types";

export interface User extends HasUuid {
  name: string;
  group: boolean;
}

export interface StoreState {
  allUsers: User[];
  usersInGroup: {
    [s: string]: User[];
  };
  groupsForUser: {
    [s: string]: User[];
  };
}
