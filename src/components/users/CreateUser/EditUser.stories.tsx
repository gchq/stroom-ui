import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import EditUser from "./EditUser";
import * as loremIpsum from "lorem-ipsum";
import { User } from "..";

const lr = (count: number) => loremIpsum({ count, units: "words" });

const stories = storiesOf("Users/EditUser", module);

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

const getUser = (): User => {
  return {
    email: lr(1),
    state: "enabled",
    firstName: lr(1),
    lastName: lr(1),
    comments: lr(20),
    forcePasswordChange: true,
    neverExpires: false,
    loginCount: 0,
    createdByUser: lr(1),
    createdOn: "2019-01-01T23:01:01.111Z",
  };
};

let newUser = getUser();
stories.add("brand new", () => getComponent(newUser));

let wellUsedUser = getUser();
wellUsedUser.forcePasswordChange = false;
wellUsedUser.loginCount = 99;
wellUsedUser.updatedOn = "2019-02-02T23:01:01.111Z";
wellUsedUser.updatedByUser = lr(1);
wellUsedUser.lastLogin = "2019-04-03T23:01:01.222Z";
stories.add("well used", () => getComponent(wellUsedUser));

let disabledUser = getUser();
disabledUser.state = "disabled";
stories.add("disabled", () => getComponent(disabledUser));

let inactiveUser = getUser();
inactiveUser.state = "inactive";
stories.add("inactive", () => getComponent(inactiveUser));

let lockedUser = getUser();
lockedUser.state = "locked";
stories.add("locked", () => getComponent(lockedUser));
