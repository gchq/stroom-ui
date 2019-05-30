import * as React from "react";

import AddElementForm, { useThisForm } from "./AddElementForm";
import { addStory } from "testing/storybook/themedStoryGenerator";
import useElements from "../useElements";
import JsonDebug from "testing/JsonDebug";

const existingNames: string[] = ["Tom", "Dick", "Harry"];

const TestHarness: React.FunctionComponent = () => {
  const { elementDefinitions } = useElements();
  const { value, componentProps } = useThisForm({
    existingNames,
    elementDefinition: elementDefinitions[0],
  });

  return (
    <div>
      <AddElementForm {...componentProps} />
      <JsonDebug value={{ value, existingNames }} />
    </div>
  );
};

addStory("Document Editors/Pipeline/Add Element", "Form", module, () => <TestHarness />);
