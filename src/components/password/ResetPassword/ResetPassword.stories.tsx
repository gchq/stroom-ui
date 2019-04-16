import { storiesOf } from "@storybook/react";
import * as React from "react";
import ResetPassword from "./ResetPassword";

const stories = storiesOf("Auth/ResetPassword", module);

stories.add("basic", () => <ResetPassword />);
