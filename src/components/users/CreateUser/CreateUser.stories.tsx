import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CreateUser from "./CreateUser";

storiesOf("Users/CreateUser", module).add("basic", () => (
  <CreateUser
    onBack={action("onBack")}
    onSubmit={action("onSubmit")}
    onCancel={action("onCancel")}
    onValidate={() => {
      return new Promise(() => {
        action("onValidate");
      });
    }}
  />
));
