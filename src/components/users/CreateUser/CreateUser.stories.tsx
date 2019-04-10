import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CreateUser from "./CreateUser";

storiesOf("General Purpose/User/CreateUser", module).add("basic", () => (
  <CreateUser />
));
