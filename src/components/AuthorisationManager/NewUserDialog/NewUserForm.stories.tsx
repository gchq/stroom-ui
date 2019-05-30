import * as React from "react";
import { addStory } from "testing/storybook/themedStoryGenerator";
import JsonDebug from "testing/JsonDebug";
import NewUserForm, { useThisForm } from "./NewUserForm";

const TestHarness: React.FunctionComponent = () => {
  const { value, componentProps } = useThisForm();

  return (
    <div>
      <NewUserForm {...componentProps} />
      <JsonDebug value={value} />
    </div>
  );
};

addStory( "Sections/Authorisation Manager/New User", "Form",
module, () => <TestHarness />);
