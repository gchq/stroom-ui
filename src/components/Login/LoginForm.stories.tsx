import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import LoginForm from "./LoginForm";

storiesOf("Auth/Login", module)
  .add("simplest", () => <LoginForm onSubmit={action("onSubmit")} />)
  .add("allow password resets", () => (
    <LoginForm allowPasswordResets={true} onSubmit={action("onSubmit")} />
  ))
  .add("disallow password resets", () => (
    <LoginForm allowPasswordResets={false} onSubmit={action("onSubmit")} />
  ));
