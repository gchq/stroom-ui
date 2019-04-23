import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import UserSearch from "./UserSearch";

import {
  disabledUser,
  inactiveUser,
  lockedUser,
  newUser,
  wellUsedUser,
} from "../testData";
import { User } from "../types";

const users: User[] = [
  disabledUser,
  inactiveUser,
  lockedUser,
  newUser,
  wellUsedUser,
];
storiesOf("Users/Search", module).add("basic", () => (
  <UserSearch
    onNewUserClicked={() => action("onNewUserClicked")}
    onUserOpen={(userId: string) => action(`onUserOpen:${userId}`)}
    onDeleteUser={(userId: string) => action(`onDeleteUser: ${userId}`)}
    users={users}
  />
));
