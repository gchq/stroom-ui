import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { User } from "../types";
import {
  disabledUser,
  inactiveUser,
  lockedUser,
  newUser,
  wellUsedUser,
} from "testing/data/users";
import UserForm from "./UserForm";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";

interface Props {
  user: User;
}

const TestHarness: React.FunctionComponent<Props> = ({ user }) => {
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

interface Test {
  [s: string]: User;
}

const tests: Test = {
  "brand new": newUser,
  "well used": wellUsedUser,
  disabled: disabledUser,
  inactive: inactiveUser,
  locked: lockedUser,
};

Object.entries(tests)
  .map(k => ({
    name: k[0],
    user: k[1],
  }))
  .forEach(({ name, user }) => {
    const stories = storiesOf(`Users/User Form/${name}`, module);
    addThemedStories(stories, () => <TestHarness user={user} />);
  });
