import * as React from "react";
import { storiesOf } from "@storybook/react";
import JsonDebug from "src/testing/JsonDebug";
import useToggle from "./useToggle";
import Button from "src/components/Button";

const TestHarness: React.FunctionComponent = () => {
  const { value, toggle } = useToggle();

  return (
    <div>
      <Button text="Toggle" onClick={toggle} />
      <JsonDebug value={{ value }} />
    </div>
  );
};

storiesOf("lib/useToggle", module).add("simple", () => <TestHarness />);
