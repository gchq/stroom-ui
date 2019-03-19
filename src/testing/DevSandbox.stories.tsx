import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "./storybook/themedStoryGenerator";
import { Table, StyledInput } from "../styled/ThemeStyling";
import { StyledReactTable } from "../styled/StyledReactTable";

const tableStories = storiesOf("Dev Sandbox/Themed Table", module);

interface Person {
  name: string;
  age: number;
}

const testData: Array<Person> = [
  {
    name: "arnold",
    age: 35
  },
  { name: "cat", age: 23 },
  { name: "lister", age: 30 },
  { name: "kryten", age: 30000000 }
];

const COLUMNS = [
  {
    id: "name",
    Header: "Name",
    accessor: (u: Person) => u.name
  },
  {
    id: "name",
    Header: "Name",
    accessor: (u: Person) => u.name
  }
];

const ThemedTable = () => {
  return (
    <React.Fragment>
      <StyledInput />
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {testData.map(t => (
            <tr key={t.name}>
              <td>{t.name}</td>
              <td>{t.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>React Table</h2>
      <StyledReactTable columns={COLUMNS} data={testData} />
    </React.Fragment>
  );
};

addThemedStories(tableStories, <ThemedTable />);
