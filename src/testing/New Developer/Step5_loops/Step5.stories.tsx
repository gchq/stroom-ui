import * as React from "react";
import { storiesOf } from "@storybook/react";

interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  {
    name: "Arnold",
    age: 34,
  },
  {
    name: "David",
    age: 35,
  },
  {
    name: "Kryten",
    age: 3000000,
  },
  {
    name: "Cat",
    age: 24,
  },
];

const TestHarness: React.FunctionComponent = () => {
  return (
    <div>
      {people.map(({ name, age }, i) => (
        <div key={i}>
          <h1>{name}</h1>
          <p>Is {age} years old</p>
        </div>
      ))}
    </div>
  );
};

storiesOf("New Developer/Step 4", module).add("all", () => <TestHarness />);
