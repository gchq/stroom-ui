import * as React from "react";
import UsersTable, { useTable } from "./UsersTable";
import fullTestData from "testing/data";
import { addStory } from "testing/storybook/themedStoryGenerator";

const TestHarness: React.FunctionComponent = () => {
  const { componentProps } = useTable(fullTestData.usersAndGroups.users);

  return <UsersTable {...componentProps} />;
};

addStory("Sections/Authorisation Manager", "Users Table", module, () => <TestHarness />);
