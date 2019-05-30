import * as React from "react";
import { addStory } from "testing/storybook/themedStoryGenerator";
import ReadOnlyExpressionOperator from ".";
import { testExpression } from "../test";
import { LineContainer } from "components/LineTo";
import ElbowDown from "components/LineTo/lineCreators/ElbowDown";

const TestHarness: React.FunctionComponent = () => {
  return (
    <LineContainer LineElementCreator={ElbowDown}>
      <ReadOnlyExpressionOperator value={testExpression} />
    </LineContainer>
  );
};

addStory("Expression", "Read Only Operator", module, () => <TestHarness />);
