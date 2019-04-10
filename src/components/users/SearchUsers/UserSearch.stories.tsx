import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { UserSearch } from "..";

storiesOf("General Purpose/User/Search", module).add("basic", () => (
  <UserSearch />
));
