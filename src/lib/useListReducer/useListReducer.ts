import * as React from "react";

/**
 * This file exports a custom hook that can be used to manage a list
 * with a reducer. It handles a few simple use cases for reducer based lists
 * that were common to a number of components.
 */

interface ReceivedAction<T> {
  type: "itemsReceived";
  items: T[];
}
interface AddedToListAction<T> {
  type: "itemAdded";
  item: T;
}
interface RemovedFromListAction {
  type: "itemRemoved";
  itemKey: string;
}

const createListReducer = <T extends {}>(getKey: (item: T) => string) => {
  return (
    state: T[],
    action: ReceivedAction<T> | AddedToListAction<T> | RemovedFromListAction,
  ): T[] => {
    switch (action.type) {
      case "itemsReceived":
        return action.items;
      case "itemAdded":
        return state.concat([action.item]);
      case "itemRemoved":
        return state.filter(u => getKey(u) !== action.itemKey);
    }

    return state;
  };
};

interface UseListReducer<T extends {}> {
  items: T[];
  itemsReceived: (items: T[]) => void;
  itemAdded: (item: T) => void;
  itemRemoved: (itemKey: string) => void;
}

const useListReducer = <T extends {}>(
  getKey: (item: T) => string,
): UseListReducer<T> => {
  const [items, dispatch] = React.useReducer(createListReducer<T>(getKey), []);

  return {
    items,
    itemsReceived: React.useCallback(
      (items: T[]) =>
        dispatch({
          type: "itemsReceived",
          items,
        }),
      [],
    ),
    itemAdded: React.useCallback(
      (item: T) =>
        dispatch({
          type: "itemAdded",
          item,
        }),
      [],
    ),
    itemRemoved: React.useCallback(
      (itemKey: string) =>
        dispatch({
          type: "itemRemoved",
          itemKey,
        }),
      [],
    ),
  };
};

export default useListReducer;
