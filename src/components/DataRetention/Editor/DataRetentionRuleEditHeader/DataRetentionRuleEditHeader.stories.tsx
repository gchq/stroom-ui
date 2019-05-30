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

const reducer = (
  state: DataRetentionRule,
  updates: Partial<DataRetentionRule>,
) => ({
  ...state,
  ...updates,
});

const TestHarness: React.FunctionComponent<Props> = ({ initialRule }) => {
  const [rule, updateRule] = React.useReducer(reducer, initialRule);

  const onNameChange: React.ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(
    ({ target: { value } }) => {
      updateRule({ name: value });
    },
    [updateRule],
  );
  const onEnabledChange: (
    checked: boolean,
    event: MouseEvent,
  ) => void = React.useCallback(enabled => updateRule({ enabled }), [
    updateRule,
  ]);

  return (
    <DataRetentionRuleEditHeader
      rule={rule}
      handleNameChange={onNameChange}
      handleDelete={action("onDelete")}
      handleEnabledChange={onEnabledChange}
    />
  );
};

addThemedStories(stories, () => <TestHarness initialRule={rule1} />);
