import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ResetPasswordRequest } from ".";

const stories = storiesOf("Auth/ResetPasswordRequest", module);

stories.add("basic", () => <ResetPasswordRequest />);
