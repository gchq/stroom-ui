import * as React from "react";

import { storiesOf } from "@storybook/react";
import useLocalStorage, { storeString } from "./useLocalStorage";
import JsonDebug from "src/testing/JsonDebug";

const TestHarness: React.FunctionComponent = () => {
  const [storageKey, setStorageKey] = React.useState<string>(
    "testUseLocalStorage",
  );

  const { value, setValue } = useLocalStorage(
    storageKey,
    "defaultValue",
    storeString,
  );

  const onChangeStorageKey: React.ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(
    ({ target: { value } }) => {
      setStorageKey(value);
    },
    [setValue],
  );

  const onChangeValue: React.ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(
    ({ target: { value } }) => {
      setValue(value);
    },
    [setValue],
  );
  console.log("Rendering useLocalStorage test Harness");

  return (
    <div>
      <form>
        <label>Storage Key</label>
        <input value={storageKey} onChange={onChangeStorageKey} />
        <label>Value in Storage</label>
        <input value={value} onChange={onChangeValue} />
      </form>
      <JsonDebug value={{ storageKey, value }} />
    </div>
  );
};

storiesOf("Custom Hooks/useLocalStorage", module).add("test", () => (
  <TestHarness />
));
