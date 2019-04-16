import { storiesOf } from "@storybook/react";
import * as React from "react";
import Login from ".";

const stories = storiesOf("Auth/Login", module);

stories.add("basic", () => <Login />);
