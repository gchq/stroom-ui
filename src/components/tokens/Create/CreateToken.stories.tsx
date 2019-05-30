import * as React from "react";
import { action } from "@storybook/addon-actions";
import { addStory } from "testing/storybook/themedStoryGenerator";
import CreateTokenForm from "./CreateTokenForm";

addStory("Tokens", "Create", module, () => (
  <CreateTokenForm
    onSubmit={action("onSubmit")}
    onBack={action("onBack")}
    userServiceUrl="not_a_real_url"
    idToken="not_a_real_idToken"
  />
));
