import * as React from "react";

import { storiesOf } from "@storybook/react";
import useLocalStorage, { useStoreObjectFactory } from "./useLocalStorage";
import JsonDebug from "src/testing/JsonDebug";

interface TestStore1 {
  name: string;
}

interface TestStore2 {
  names: string[];
}

const TestHarness: React.FunctionComponent = () => {
  const storageKey1 = "testWithSetValue";
  const storageKey2 = "testWithReducer";

  const {
    value: value1,
    setValue: setValue1,
    resetValue: resetValue1,
  } = useLocalStorage<TestStore1>(
    storageKey1,
    {
      name: "someName",
    },
    useStoreObjectFactory(),
  );

  const onName1Change: React.ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(
    ({ target: { value } }) => {
      setValue1({ name: value });
    },
    [setValue1],
  );

  const [newValue2, setNewValue2] = React.useState<string>("kochanski");
  const onNewValue2Change: React.ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(({ target: { value } }) => setNewValue2(value), [
    setNewValue2,
  ]);

  const {
    value: value2,
    reduceValue: reduceValue2,
    resetValue: resetValue2,
  } = useLocalStorage<TestStore2>(
    storageKey2,
    {
      names: ["lister", "rimmer", "cat", "kryten"],
    },
    useStoreObjectFactory(),
  );

  const onAddValue2 = React.useCallback(() => {
    reduceValue2(existing => ({ names: [newValue2, ...existing.names] }));
  }, [newValue2, reduceValue2]);

  const onRemoveValue2 = React.useCallback(() => {
    reduceValue2(existing => ({
      names: existing.names.filter(e => e !== newValue2),
    }));
  }, [newValue2, reduceValue2]);

  const resetStorage = React.useCallback(() => {
    resetValue1(), resetValue2();
  }, [resetValue1, resetValue2]);

  return (
    <div>
      <p>Storage 1 demonstrates simple use of setValue</p>
      <p>
        Storage 2 demonstrates the use of a reducer, where any new value is
        calculated with reference to the existing one.
      </p>
      <p>
        If a reducer is not used, and instead a function is memoized that gets
        recreated when the value changes, you end up with a recursive render. So
        for any local storage values that need to use the existing value to
        calculate the new value, use a reducer.
      </p>
      <form>
        <div>
          <label>Value in Storage 1</label>
          <input value={value1.name} onChange={onName1Change} />
        </div>
        <div>
          <label>Value for Storage 2</label>
          <input value={newValue2} onChange={onNewValue2Change} />
        </div>
      </form>

      <div>
        <h4>Modify Value 2</h4>
        <button onClick={onAddValue2}>Add Value 2</button>
        <button onClick={onRemoveValue2}>Remove Value 2</button>
      </div>
      <div>
        <button onClick={resetStorage}>Reset All Storage</button>
      </div>
      <JsonDebug value={{ storageKey1, value1, storageKey2, value2 }} />
    </div>
  );
};

storiesOf("lib/useLocalStorage", module).add("test", () => <TestHarness />);
