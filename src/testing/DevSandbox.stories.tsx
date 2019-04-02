import * as React from "react";
import { useState, useCallback, useContext } from "react";
import { storiesOf } from "@storybook/react";
import JsonDebug from "./JsonDebug";

// Something very odd going on with use of Context in Storybook.
// If you useContext in an inline function (even called several hooks deep)
// it always just gets the default value of that context, and never updates based on the
// context provided by the decorator.
// WHEREAS
// If you define a TestHarness 'function component' and call the same context there
// it will latch onto the correct context from the decorator.

const MyContext = React.createContext<number>(13);

const TestHarness = () => {
  const valueRead = useContext(MyContext);

  return (
    <div>
      <p>
        This component should be working correctly with the context provided by
        the decorator. It makes no sense to me that the inline function does not
        work, but at least this solves the problem.
      </p>
      <JsonDebug value={{ valueRead }} />
    </div>
  );
};

storiesOf("Dev Sandbox/Context Weirdness Demo", module)
  .addDecorator(fn => {
    const [value, setValue] = useState<number>(23);

    const increment = useCallback(() => setValue(value + 1), [value, setValue]);

    return (
      <MyContext.Provider value={value}>
        <button onClick={increment}>Increment</button>
        {fn()}
      </MyContext.Provider>
    );
  })

  // This one will NOT update correctly, it will get the default value of the context,
  // not even the 'initial value' of the decorator one.
  .add("usingContextDirectly", () => {
    const valueRead = useContext(MyContext);

    return (
      <div>
        <p>
          This component will not work correctly, because it is reading in the
          context in an inline function within the story. For some reason,
          decorators that provide context do not work quite correctly/as
          expected in this case. Switch to usingTestHarness to see a working
          version of this component.
        </p>
        <JsonDebug value={{ valueRead }} />
      </div>
    );
  })

  // This works just fine...so just do this
  .add("usingTestHarness", () => <TestHarness />);
