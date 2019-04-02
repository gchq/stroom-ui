import * as React from "react";

/**
 * This is an example of a custom hook.
 *
 * It returns a count value, and two functions to modify that count.
 *
 *
 */

interface UseCounter {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounter = (): UseCounter => {
  const [count, setCount] = React.useState<number>(0);

  /**
   *  Use callback means it will only regenerate these functions if the values of the arguments
   * change. In this case, they will change quite often, but in some other places, this use of memo-ization
   * saves a lot of performance. It is also essential to memo-ize things to prevent infinite recursive render loops.
   */
  const increment = React.useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);
  const decrement = React.useCallback(() => {
    setCount(count - 1);
  }, [count, setCount]);

  return {
    count,
    increment,
    decrement,
  };
};
