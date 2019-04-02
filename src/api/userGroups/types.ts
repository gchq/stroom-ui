import { User } from "src/types";

export type IsGroup = "User" | "Group" | "" | undefined;

export interface StoreState {
  allUsers: User[];
  usersInGroup: {
    [s: string]: User[];
  };
  groupsForUser: {
    [s: string]: User[];
  };
}
