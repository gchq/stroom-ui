import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DataRetentionRuleEditHeader from "./DataRetentionRuleEditHeader";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import { DataRetentionRule } from "components/DataRetention/types/DataRetentionRule";

const stories = storiesOf("Sections/DataRetention/Rule/Edit Header", module);

const rule1: DataRetentionRule = {
  ruleNumber: 1,
  name: "some rule name",
  enabled: true,
  age: 1,
  timeUnit: "Years",
  forever: false,
  expression: {
    op: "AND",
    children: [],
    enabled: true,
    type: "operator",
  },
};

interface Props {
  initialRule: DataRetentionRule;
}

const TestHarness: React.FunctionComponent<Props> = ({ initialRule }) => {
  return (
    <DataRetentionRuleEditHeader
      rule={initialRule}
      handleNameChange={action("onNameChange")}
      handleDelete={action("onDelete")}
      handleEnabledChange={action("enabledChanged")}
    />
  );
};

addThemedStories(stories, () => <TestHarness initialRule={rule1} />);
