import * as React from "react";
import fullTestData from "testing/data";
import DocRefInfoForm from "./DocRefInfoForm";
import { addStory } from "testing/storybook/themedStoryGenerator";

const testFolder1 = fullTestData.documentTree.children![0];

const TestHarness: React.FunctionComponent = () => {
  return <DocRefInfoForm docRef={testFolder1} />;
};

addStory("Doc Ref/Info", "Form", module, () => <TestHarness />);
