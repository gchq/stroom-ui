import * as React from "react";

import { storiesOf } from "@storybook/react";
import useLocalStorage, { useStoreObjectFactory } from "./useLocalStorage";
import JsonDebug from "src/testing/JsonDebug";

interface TestStore {
  name: string;
}

const TestHarness: React.FunctionComponent = () => {
  const storageKey = "testUseLocalStorage";

  const { value, setValue } = useLocalStorage<TestStore>(
    storageKey,
    {
      name: "someName",
    },
    useStoreObjectFactory(),
  );

  const onNameChange: React.ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(
    ({ target: { value } }) => {
      setValue({ name: value });
    },
    [setValue],
  );

  return (
    <div>
      <form>
        <label>Value in Storage</label>
        <input value={value.name} onChange={onNameChange} />
      </form>
      <JsonDebug value={{ storageKey, value }} />
    </div>
  );
};

storiesOf("Custom Hooks/useLocalStorage", module).add("test", () => (
  <TestHarness />
));
