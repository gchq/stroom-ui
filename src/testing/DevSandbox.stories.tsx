import * as React from "react";
import { storiesOf } from "@storybook/react";
import ReactTable from "react-table";

import { addThemedStories } from "./storybook/themedStoryGenerator";

const tableStories = storiesOf("Dev Sandbox/Stuff", module);

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
      <table>
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
      </table>

      <h2>React Table</h2>
      <ReactTable columns={COLUMNS} data={testData} />
    </React.Fragment>
  );
};

addThemedStories(tableStories, <ThemedTable />);
