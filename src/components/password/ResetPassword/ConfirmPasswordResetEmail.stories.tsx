import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ConfirmPasswordResetEmail } from ".";

const stories = storiesOf("Auth/ConfirmPasswordResetEmail", module);

stories.add("basic", () => <ConfirmPasswordResetEmail />);
