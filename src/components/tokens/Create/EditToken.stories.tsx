import * as React from "react";
import { addStory } from "testing/storybook/themedStoryGenerator";
import EditTokenForm from "./EditTokenForm";
import { action } from "@storybook/addon-actions";
import { Token } from "../api/types";

const token: Token = {
  id: "tokenId",
  enabled: true,
  userEmail: "userEmail",
  expiresOn: "2019-01-01T00:00:00.000Z",
  issuedOn: "2018-01-01T00:00:00.000Z",
  issuedByUser: "issueing user",
  updatedOn: "2019-02-01T00:00:00.000Z",
  updatedByUser: "updating user",
  token: "token string",
};

addStory("Tokens", "Edit", module, () => (
  <EditTokenForm
    onChangeState={action("onChangeState")}
    onBack={action("onBack")}
    token={token}
  />
));
