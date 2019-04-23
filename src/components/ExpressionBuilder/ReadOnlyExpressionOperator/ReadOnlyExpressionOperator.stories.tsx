import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import ReadOnlyExpressionOperator from ".";
import { testExpression } from "../test";
import { LineContainer } from "src/components/LineTo";
import ElbowDown from "src/components/LineTo/lineCreators/ElbowDown";

const TestHarness: React.FunctionComponent = () => {
  return (
    <LineContainer LineElementCreator={ElbowDown}>
      <ReadOnlyExpressionOperator value={testExpression} />
    </LineContainer>
  );
};

const stories = storiesOf("Expression/Read Only Operator", module);

addThemedStories(stories, () => <TestHarness />);
