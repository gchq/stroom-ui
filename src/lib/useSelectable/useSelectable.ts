import * as React from "react";
import useKeyIsDown, { KeyDownState } from "lib/useKeyIsDown";

interface InProps<T extends {}> {
  items: T[];
  getKey: (item: T) => string;
}

interface OutProps<T extends {}> {
  selectedItems: T[];
  selectedIndexes: number[];
  selectedKeys: string[];
  lastSelectedKey: string | undefined;
  lastSelectedIndex: number | undefined;
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
  selectedIndexes: number[];
  rawKeys: string[];
  lastSelectedKey: string | undefined;
  lastSelectedIndex: number | undefined;
}

const reducer = (
  state: ReducerState,
  action: SelectionToggled | SelectionCleared | UpdateRawKeys,
): ReducerState => {
  const { selectedKeys, rawKeys, lastSelectedKey, lastSelectedIndex } = state;
  switch (action.type) {
    case "toggled": {
      const { key, isShiftDown, isCtrlDown } = action;
      // If CTRL is down (includes Meta) then simply add the keys
      if (isCtrlDown) {
        if (selectedKeys.includes(key)) {
          const newSelectedKeys: string[] = selectedKeys.filter(k => k !== key);
          return {
            rawKeys,
            selectedKeys: newSelectedKeys,
            selectedIndexes: rawKeys
              .map((k, i) => (newSelectedKeys.includes(k) ? i : undefined))
              .filter(i => i !== undefined),
            lastSelectedKey: key,
            lastSelectedIndex: rawKeys.findIndex(d => d === key),
          };
        } else {
          const newSelectedKeys = [...selectedKeys, key];
          return {
            rawKeys,
            selectedKeys: newSelectedKeys,
            selectedIndexes: rawKeys
              .map((k, i) => (newSelectedKeys.includes(k) ? i : undefined))
              .filter(i => i !== undefined),
            lastSelectedKey: key,
            lastSelectedIndex: rawKeys.findIndex(d => d === key),
          };
        }
      } else if (isShiftDown) {
        let newSelectedKeys: string[] = [];
        const lastSelectedIndex = rawKeys.indexOf(lastSelectedKey);
        const thisSelectedIndex = rawKeys.indexOf(key);

        if (lastSelectedKey === undefined) {
          newSelectedKeys.push(key);
        } else if (thisSelectedIndex < lastSelectedIndex) {
          newSelectedKeys = rawKeys.slice(
            thisSelectedIndex,
            lastSelectedIndex + 1,
          );
        } else {
          newSelectedKeys = rawKeys.slice(
            lastSelectedIndex,
            thisSelectedIndex + 1,
          );
        }

        return {
          rawKeys,
          selectedKeys: newSelectedKeys,
          selectedIndexes: rawKeys
            .map((k, i) => (newSelectedKeys.includes(k) ? i : undefined))
            .filter(i => i !== undefined),
          lastSelectedKey: key,
          lastSelectedIndex: rawKeys.findIndex(d => d === key),
        };
      } else {
        const newSelectedKeys: string[] = selectedKeys.includes(key)
          ? []
          : [key];
        return {
          rawKeys,
          selectedKeys: newSelectedKeys,
          selectedIndexes: rawKeys
            .map((k, i) => (newSelectedKeys.includes(k) ? i : undefined))
            .filter(i => i !== undefined),
          lastSelectedKey: key,
          lastSelectedIndex: rawKeys.findIndex(d => d === key),
        };
      }
    }
    case "cleared":
      return {
        rawKeys,
        selectedKeys: [],
        selectedIndexes: [],
        lastSelectedKey: undefined,
        lastSelectedIndex: undefined,
      };
    case "updateRawKeys":
      const newSelectedKeys: string[] = selectedKeys.filter(s =>
        action.rawKeys.includes(s),
      );
      return {
        rawKeys: action.rawKeys,
        selectedKeys: newSelectedKeys,
        selectedIndexes: rawKeys
          .map((k, i) => (newSelectedKeys.includes(k) ? i : undefined))
          .filter(i => i !== undefined),
        lastSelectedKey: action.rawKeys.includes(lastSelectedKey)
          ? lastSelectedKey
          : undefined,
        lastSelectedIndex: action.rawKeys.includes(lastSelectedKey)
          ? lastSelectedIndex
          : undefined,
      };
    default:
      return state;
  }
};

const keyDownFilters: string[] = ["Control", "Shift", "Meta"];

const useSelectable = <T extends {}>({
  items,
  getKey,
}: InProps<T>): OutProps<T> => {
  const keyIsDown: KeyDownState = useKeyIsDown(keyDownFilters);
  const [
    { selectedKeys, lastSelectedKey, lastSelectedIndex, selectedIndexes },
    dispatch,
  ] = React.useReducer(reducer, {
    rawKeys: [],
    selectedKeys: [],
    selectedIndexes: [],
    lastSelectedKey: undefined,
    lastSelectedIndex: undefined,
  });
  React.useEffect(() => {
    const rawKeys: string[] = items.map(getKey);
    dispatch({ type: "updateRawKeys", rawKeys });
  }, [items, dispatch, getKey]);

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
    [selectedKeys, getKey, items],
  );

  return {
    selectedItems,
    selectedIndexes,
    selectedKeys,
    lastSelectedKey,
    lastSelectedIndex,
    toggleSelection,
    clearSelection,
  };
};

export default useSelectable;
