import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { User } from "..";
import {
  disabledUser,
  inactiveUser,
  lockedUser,
  newUser,
  wellUsedUser,
} from "../testData";
import EditUser from "./EditUser";

const getComponent = (user: User) => {
  return (
    <EditUser
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

const stories = storiesOf("Users/EditUser", module)
  .add("brand new", () => getComponent(newUser))
  .add("well used", () => getComponent(wellUsedUser))
  .add("disabled", () => getComponent(disabledUser))
  .add("inactive", () => getComponent(inactiveUser))
  .add("locked", () => getComponent(lockedUser));
