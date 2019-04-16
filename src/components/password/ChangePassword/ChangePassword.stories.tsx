import { storiesOf } from "@storybook/react";
import * as React from "react";
import ChangePassword from "./ChangePassword";

const stories = storiesOf("Auth/ChangePassword", module);

stories.add("basic", () => <ChangePassword />);
