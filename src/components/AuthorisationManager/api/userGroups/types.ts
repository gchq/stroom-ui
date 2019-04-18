export interface User {
  uuid: string;
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
