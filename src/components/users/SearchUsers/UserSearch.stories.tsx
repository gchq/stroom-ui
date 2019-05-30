import { action } from "@storybook/addon-actions";
import * as React from "react";
import UserSearch from "./UserSearch";

import { addStory } from "testing/storybook/themedStoryGenerator";
import fullTestData from "testing/data";

addStory("Users", "Search", module, () => (
  <UserSearch
    onNewUserClicked={() => action("onNewUserClicked")}
    onUserOpen={(userId: string) => action(`onUserOpen:${userId}`)}
    onDeleteUser={(userId: string) => action(`onDeleteUser: ${userId}`)}
    users={fullTestData.users}
  />
));
