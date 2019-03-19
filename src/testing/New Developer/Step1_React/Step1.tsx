// This import has to be at the top of any file that uses JSX.
import * as React from "react";

// Imports must be relative
import { CustomHeader } from "./CustomHeader";

/**
 * This is a basic 'Function Component'.
 * React used to use classes, which allowed things like state and side effects, but
 * that has all gone away in favour of hooks now. So Function Components are all you should see.
 */
export const Step1 = () => {
  /**
   * In this function, I have declared a full function body, and included a return statement.
   * Have a look at CustomHeader for an example of simply returning the value of the function in
   * one go.
   */
  return (
    <div>
      <CustomHeader title="Simple Component" />
      <p>This is a simple React Compoenent</p>
    </div>
  );
};
