import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import JsonDebug from "testing/JsonDebug";
import RenameDocRefForm from "./RenameDocRefForm";

const stories = storiesOf(
  "Document Editors/Folder/Rename Doc Ref/Form",
  module,
);

const TestHarness: React.FunctionComponent = () => {
  return (
    <div>
      <RenameDocRefForm />
      <JsonDebug value={{}} />
    </div>
  );
};

addThemedStories(stories, () => <TestHarness />);
