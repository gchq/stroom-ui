import * as React from "react";

interface InProps<T extends {}> {
  items: T[];
}

interface OutProps<T extends {}> {
  focusIndex: number;
  focussedItem: T | undefined;
  up: () => void;
  down: () => void;
  clear: () => void;
}

interface ReducerState {
  itemsLength: number;
  focusIndex: number;
}

const NO_FOCUS = -1;

interface ChangeFocus {
  type: "up" | "down" | "clear";
}
interface SetItemsLength {
  type: "setLength";
  itemsLength: number;
}

const reducer = (
  { focusIndex, itemsLength }: ReducerState,
  action: ChangeFocus | SetItemsLength,
): ReducerState => {
  switch (action.type) {
    case "up":
      return {
        itemsLength,
        focusIndex: (focusIndex + -1 + itemsLength) % itemsLength,
      };
    case "down":
      return { itemsLength, focusIndex: (focusIndex + 1) % itemsLength };
    case "clear":
      return {
        itemsLength,
        focusIndex: NO_FOCUS,
      };
    case "setLength":
      return {
        itemsLength: action.itemsLength,
        focusIndex: focusIndex % action.itemsLength,
      };
    default:
      return { focusIndex, itemsLength };
  }
};

const useCustomFocus = <T extends {}>({ items }: InProps<T>): OutProps<T> => {
  const [{ focusIndex }, dispatch] = React.useReducer(reducer, {
    focusIndex: NO_FOCUS,
    itemsLength: items.length,
  });

  React.useEffect(
    () => dispatch({ type: "setLength", itemsLength: items.length }),
    [items, dispatch],
  );

  const focussedItem: T | undefined = React.useMemo(() => {
    if (focusIndex > 0 && focusIndex < items.length) {
      return items[focusIndex];
    } else {
      return undefined;
    }
  }, [focusIndex, items]);

  const up = React.useCallback(() => dispatch({ type: "up" }), [dispatch]);
  const down = React.useCallback(() => dispatch({ type: "down" }), [dispatch]);
  const clear = React.useCallback(() => dispatch({ type: "clear" }), [
    dispatch,
  ]);

  return {
    focusIndex,
    focussedItem,
    up,
    down,
    clear,
  };
};

export default useCustomFocus;
