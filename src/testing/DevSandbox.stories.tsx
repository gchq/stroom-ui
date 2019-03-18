import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "./storybook/themedStoryGenerator";
import { Table, Input } from "../styled/ThemeStyling";

const tableStories = storiesOf("Dev Sandbox/Themed Table", module);

const TestData = [
  {
    name: "arnold",
    age: 35
  },
  { name: "cat", age: 23 },
  { name: "lister", age: 30 },
  { name: "kryten", age: 30000000 }
];

const ThemedTable = () => {
  return (
    <React.Fragment>
      <Input />
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {TestData.map(t => (
            <tr key={t.name}>
              <td>{t.name}</td>
              <td>{t.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

addThemedStories(tableStories, <ThemedTable />);
