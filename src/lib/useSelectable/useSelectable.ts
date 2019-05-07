import * as React from "react";
import useKeyIsDown, { KeyDownState } from "lib/useKeyIsDown";

interface InProps<T extends {}> {
  items: T[];
  getKey: (item: T) => string;
}

interface OutProps<T extends {}> {
  selectedItems: T[];
  toggleSelection: (key: string) => void;
  clearSelection: () => void;
}

interface SelectionToggled {
  type: "toggled";
  key: string;
  isCtrlDown: boolean;
  isShiftDown: boolean;
}

interface SelectionCleared {
  type: "cleared";
}

interface UpdateRawKeys {
  type: "updateRawKeys";
  rawKeys: string[];
}

interface ReducerState {
  selectedKeys: string[];
  rawKeys: string[];
}

const reducer = (
  { selectedKeys, rawKeys }: ReducerState,
  action: SelectionToggled | SelectionCleared | UpdateRawKeys,
): ReducerState => {
  switch (action.type) {
    case "toggled": {
      const { key, isShiftDown, isCtrlDown } = action;
      if (isCtrlDown) {
        if (selectedKeys.includes(key)) {
          return {
            rawKeys,
            selectedKeys: selectedKeys.filter(k => k !== key),
          };
        } else {
          return { rawKeys, selectedKeys: [...selectedKeys, key] };
        }
      }
    }
    case "cleared":
      return { rawKeys, selectedKeys: [] };
    case "updateRawKeys":
      return {
        rawKeys: action.rawKeys,
        selectedKeys: selectedKeys.filter(s => action.rawKeys.includes(s)),
      };
    default:
      return { selectedKeys, rawKeys };
  }
};

const keyDownFilters: string[] = ["Control", "Shift", "Meta"];

const useSelectable = <T extends {}>({
  items,
  getKey,
}: InProps<T>): OutProps<T> => {
  const keyIsDown: KeyDownState = useKeyIsDown(keyDownFilters);
  const [{ selectedKeys }, dispatch] = React.useReducer(reducer, {
    rawKeys: [],
    selectedKeys: [],
  });
  React.useEffect(() => {
    const rawKeys: string[] = items.map(getKey);
    dispatch({ type: "updateRawKeys", rawKeys });
  }, [items, dispatch]);

  const toggleSelection = React.useCallback(
    (key: string) =>
      dispatch({
        type: "toggled",
        key,
        isCtrlDown: keyIsDown["Control"] || keyIsDown["Meta"],
        isShiftDown: keyIsDown["Shift"],
      }),
    [dispatch, keyIsDown],
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
