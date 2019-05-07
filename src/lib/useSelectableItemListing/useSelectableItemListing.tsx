import * as React from "react";
import { InProps, OutProps } from "./types";
import { SelectionBehaviour } from "./enums";
import useOnKeyDown from "lib/useOnKeyDown";
import useCustomFocus from "lib/useCustomFocus";
import useSelectable from "lib/useSelectable/useSelectable";

const useSelectableItemListing = <TItem extends {}>({
  getKey,
  items,
  openItem,
  enterItem,
  goBack,
  selectionBehaviour = SelectionBehaviour.NONE,
  preFocusWrap,
}: InProps<TItem>): OutProps<TItem> => {
  const { up, down, focusIndex, focussedItem } = useCustomFocus<TItem>({
    items,
    preFocusWrap,
  });
  const {
    toggleSelection,
    clearSelection,
    selectedItems,
    selectedIndexes,
    lastSelectedKey,
    lastSelectedIndex,
  } = useSelectable<TItem>({ items, getKey });

  const enterItemOnKey = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (focussedItem) {
        if (!!openItem) {
          openItem(focussedItem);
        } else {
          toggleSelection(getKey(focussedItem));
        }
      }
      e.preventDefault();
    },
    [focussedItem, openItem, toggleSelection, getKey],
  );
  const goRight = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (!!focussedItem) {
        if (!!enterItem) {
          enterItem(focussedItem);
        } else if (!!openItem) {
          openItem(focussedItem);
        }
      }
      e.preventDefault();
    },
    [focussedItem, enterItem, openItem],
  );
  const goLeft = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (!!focussedItem && !!goBack) {
        goBack(focussedItem);
      }
      e.preventDefault();
    },
    [focussedItem, goBack],
  );
  const spaceKey = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (selectionBehaviour !== SelectionBehaviour.NONE) {
        toggleSelection(getKey(focussedItem));
        e.preventDefault();
      }
    },
    [selectionBehaviour, toggleSelection, getKey, focussedItem],
  );

  const onKeyDown = useOnKeyDown({
    ArrowUp: up,
    k: up,
    ArrowDown: down,
    j: down,
    ArrowLeft: goLeft,
    h: goLeft,
    ArrowRight: goRight,
    l: goRight,
    Enter: enterItemOnKey,
    " ": spaceKey,
  });

  const selectedItem: TItem | undefined =
    selectedItems.length > 0 && !!lastSelectedKey
      ? items.find(item => getKey(item) === lastSelectedKey)
      : undefined;

  return {
    focusIndex,
    focussedItem,
    selectedItems,
    selectedIndexes,
    selectedItem,
    lastSelectedIndex,
    toggleSelection,
    clearSelection,
    onKeyDown,
  };
};

export default useSelectableItemListing;
