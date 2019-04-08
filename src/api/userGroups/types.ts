import { User } from "src/types";

export interface StoreState {
  allUsers: User[];
  usersInGroup: {
    [s: string]: User[];
  };
  groupsForUser: {
    [s: string]: User[];
  };
}
