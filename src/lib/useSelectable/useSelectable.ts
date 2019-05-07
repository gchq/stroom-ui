import * as React from "react";

interface InProps<T extends {}> {
  items: T[];
  getKey: (item: T) => string;
}

interface OutProps<T extends {}> {
  selectedItems: T[];
  toggleSelection: (itemKey: string) => void;
  clearSelection: () => void;
}

interface SelectionToggled {
  type: "toggled";
  key: string;
}

interface SelectionCleared {
  type: "cleared";
}

const reducer = (
  state: string[],
  action: SelectionToggled | SelectionCleared,
) => {
  switch (action.type) {
    case "toggled":
      if (state.includes(action.key)) {
        return state.filter(k => k !== action.key);
      } else {
        return [...state, action.key];
      }
    case "cleared":
      return [];
    default:
      return state;
  }
};

const useSelectable = <T extends {}>({
  items,
  getKey,
}: InProps<T>): OutProps<T> => {
  const [selectedKeys, dispatch] = React.useReducer(reducer, []);

  const toggleSelection = React.useCallback(
    (key: string) => dispatch({ type: "toggled", key }),
    [dispatch],
  );
  const clearSelection = React.useCallback(
    () => dispatch({ type: "cleared" }),
    [dispatch],
  );

  const selectedItems: T[] = React.useMemo(
    () => items.filter(item => selectedKeys.includes(getKey(item))),
    [selectedKeys, getKey],
  );

  return {
    selectedItems,
    toggleSelection,
    clearSelection,
  };
};

export default useSelectable;
