import { useReducer, useCallback } from "react";

/**
 * This file exports a custom hook that can be used to manage a list
 * with a reducer. It handles a few simple use cases for reducer based lists
 * that were common to a number of components.
 */

type Received<T> = {
  type: "itemsReceived";
  items: Array<T>;
};
type AddedToList<T> = {
  type: "itemAdded";
  item: T;
};
type RemovedFromList = {
  type: "itemRemoved";
  itemKey: string;
};

const createListReducer = <T extends {}>(getKey: (item: T) => string) => {
  return (
    state: Array<T>,
    action: Received<T> | AddedToList<T> | RemovedFromList
  ): Array<T> => {
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
  items: Array<T>;
  itemsReceived: (items: Array<T>) => void;
  itemAdded: (item: T) => void;
  itemRemoved: (itemKey: string) => void;
}

const useListReducer = <T extends {}>(
  getKey: (item: T) => string
): UseListReducer<T> => {
  const [items, dispatch] = useReducer(createListReducer<T>(getKey), []);

  return {
    items,
    itemsReceived: useCallback(
      (items: Array<T>) =>
        dispatch({
          type: "itemsReceived",
          items
        }),
      []
    ),
    itemAdded: useCallback(
      (item: T) =>
        dispatch({
          type: "itemAdded",
          item
        }),
      []
    ),
    itemRemoved: useCallback(
      (itemKey: string) =>
        dispatch({
          type: "itemRemoved",
          itemKey
        }),
      []
    )
  };
};

export default useListReducer;
