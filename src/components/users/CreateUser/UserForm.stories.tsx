import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import UserForm from "./UserForm";

import {
  disabledUser,
  inactiveUser,
  lockedUser,
  newUser,
  wellUsedUser,
} from "../testData";
import { User } from "..";

const getComponent = (user: User) => {
  return (
    <UserForm
      user={user}
      onBack={action("onBack")}
      onSubmit={action("onSubmit")}
      onCancel={action("onCancel")}
      onValidate={() => {
        return new Promise(() => {
          // FIXME: not sure why this isn't getting logged.
          // FIXME: everything seems fine when run against a server
          action("onValidate");
        });
      }}
    />
  );
};

const stories = storiesOf("Users/UserForm", module)
  .add("brand new", () => getComponent(newUser))
  .add("well used", () => getComponent(wellUsedUser))
  .add("disabled", () => getComponent(disabledUser))
  .add("inactive", () => getComponent(inactiveUser))
  .add("locked", () => getComponent(lockedUser));
