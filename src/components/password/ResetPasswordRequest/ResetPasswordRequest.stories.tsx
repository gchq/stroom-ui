import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import ResetPasswordRequest from "./ResetPasswordRequest";

const stories = storiesOf("Auth/ResetPasswordRequest", module);

stories.add("simplest", () => (
  <ResetPasswordRequest
    onBack={action("onBack")}
    onSubmit={action("onSubmit")}
  />
));
