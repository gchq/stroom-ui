import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import ResetPassword from "./ResetPassword";

const onValidate = () => {
  action("onValidate");
  return Promise.resolve();
};

storiesOf("Auth/ResetPassword", module)
  .add("simplest", () => (
    <ResetPassword
      onValidate={onValidate}
      onSubmit={action("submit")}
      isTokenExpired={false}
      isTokenInvalid={false}
      isTokenMissing={false}
    />
  ))
  .add("expired token", () => (
    <ResetPassword
      onValidate={onValidate}
      onSubmit={action("submit")}
      isTokenExpired={true}
      isTokenInvalid={false}
      isTokenMissing={false}
    />
  ))
  .add("invalid token", () => (
    <ResetPassword
      onValidate={onValidate}
      onSubmit={action("submit")}
      isTokenExpired={false}
      isTokenInvalid={true}
      isTokenMissing={false}
    />
  ))
  .add("missing token", () => (
    <ResetPassword
      onValidate={onValidate}
      onSubmit={action("submit")}
      isTokenExpired={false}
      isTokenInvalid={false}
      isTokenMissing={true}
    />
  ))
  .add("everything bad", () => (
    <ResetPassword
      onValidate={onValidate}
      onSubmit={action("submit")}
      isTokenExpired={true}
      isTokenInvalid={true}
      isTokenMissing={true}
    />
  ));
