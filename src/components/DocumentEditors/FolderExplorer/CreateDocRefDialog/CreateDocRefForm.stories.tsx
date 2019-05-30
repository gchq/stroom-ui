import * as React from "react";
import { addStory } from "testing/storybook/themedStoryGenerator";
import JsonDebug from "testing/JsonDebug";
import CreateDocRefForm, { useThisForm } from "./CreateDocRefForm";

const TestHarness: React.FunctionComponent = () => {
  const { componentProps, value } = useThisForm();

  return (
    <div>
      <CreateDocRefForm {...componentProps} />
      <JsonDebug value={value} />
    </div>
  );
};

addStory( "Document Editors/Folder/Create Doc Ref", "Form",
module, () => <TestHarness />);
