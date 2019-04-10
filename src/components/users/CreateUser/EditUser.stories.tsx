import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import EditUser from "./EditUser";

storiesOf("General Purpose/User/EditUser", module).add("basic", () => (
  <EditUser />
));
