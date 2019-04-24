import * as React from "react";
import useKeyIsDown from "../useKeyIsDown";
import { InProps, OutProps } from "./types";
import { SelectionBehaviour } from "./enums";

const defaultPreFocusWrap = () => true;

interface UseFocusChanged<T> {
  items: T[];
  focusIndex: number;
  direction: number;
  setFocusIndex: (f: number) => void;
  setFocussedItem: (i: T | undefined) => void;
  preFocusWrap: () => boolean;
}

const useFocusChanged = <T extends {}>({
  items,
  focusIndex,
  direction,
  setFocusIndex,
  setFocussedItem,
  preFocusWrap,
}: UseFocusChanged<T>) =>
  React.useCallback(() => {
    let nextIndex = 0;
    if (focusIndex !== -1) {
      nextIndex = (items.length + (focusIndex + direction)) % items.length;
    }

    // If the next index is less than the current focus index, when we tried to
    // go 'down' the listing, it means we are trying to wrap. We should check that
    // wrapping will be permitted.
    let allowWrap = nextIndex > focusIndex || direction < 0 || preFocusWrap();

    if (allowWrap) {
      setFocusIndex(nextIndex);
      setFocussedItem(items[nextIndex]);
    }
  }, [
    items,
    focusIndex,
    direction,
    setFocusIndex,
    setFocussedItem,
    preFocusWrap,
  ]);

const useSelectableItemListing = <TItem extends {}>({
  getKey,
  items,
  openItem,
  enterItem,
  goBack,
  selectionBehaviour = SelectionBehaviour.NONE,
  preFocusWrap = defaultPreFocusWrap,
}: InProps<TItem>): OutProps<TItem> => {
  const keyIsDown = useKeyIsDown();

  // I think some of these state things should be recalculated in the event of
  // the underlying items changing....may need to add a 'React.useEffect' which does
  // checking of everything
  const [focusIndex, setFocusIndex] = React.useState<number>(-1);
  const [focussedItem, setFocussedItem] = React.useState<TItem | undefined>(
    undefined,
  );
  const [lastSelectedIndex, setLastSelectedIndex] = React.useState<
    number | undefined
  >(-1);
  const [selectedItems, setSelectedItems] = React.useState<TItem[]>([]);
  const [selectedItemIndexes, setSelectedItemIndexes] = React.useState<
    Set<number>
  >(new Set());

  const focusUp = useFocusChanged({
    items,
    focusIndex,
    setFocusIndex,
    preFocusWrap,
    setFocussedItem,
    direction: -1,
  });
  const focusDown = useFocusChanged({
    items,
    focusIndex,
    setFocusIndex,
    preFocusWrap,
    setFocussedItem,
    direction: +1,
  });

  const clearSelection = React.useCallback(() => {
    setSelectedItems([]);
    setSelectedItemIndexes(new Set());
  }, [setSelectedItems, setSelectedItemIndexes]);

  const toggleSelection = (itemKey?: string) => {
    const index = items.map(getKey).findIndex(k => k === itemKey);
    const indexToUse = index !== undefined && index >= 0 ? index : focusIndex;
    let newSelectedItemIndexes = new Set();

    if (selectionBehaviour !== SelectionBehaviour.NONE) {
      const isCurrentlySelected = selectedItemIndexes.has(indexToUse);
      if (isCurrentlySelected) {
        if (keyIsDown.Control || keyIsDown.Meta) {
          selectedItemIndexes.forEach(i => {
            if (i !== indexToUse) {
              newSelectedItemIndexes.add(i);
            }
          });
        }
      } else if (selectionBehaviour === SelectionBehaviour.MULTIPLE) {
        if (keyIsDown.Control || keyIsDown.Meta) {
          selectedItemIndexes.forEach(i => newSelectedItemIndexes.add(i));
          newSelectedItemIndexes.add(indexToUse);
        } else if (keyIsDown.Shift) {
          newSelectedItemIndexes = new Set();

          if (lastSelectedIndex === undefined) {
            newSelectedItemIndexes.add(indexToUse);
          } else if (indexToUse < lastSelectedIndex) {
            for (let i = indexToUse; i <= lastSelectedIndex; i++) {
              newSelectedItemIndexes.add(i);
            }
          } else {
            for (let i = lastSelectedIndex; i <= indexToUse; i++) {
              newSelectedItemIndexes.add(i);
            }
          }
        } else {
          newSelectedItemIndexes.add(indexToUse);
        }
      } else {
        newSelectedItemIndexes.add(indexToUse);
      }
    }

    const newSelectedItems: any[] = [];
    newSelectedItemIndexes.forEach((i: number) =>
      newSelectedItems.push(items[i]),
    );
    const newFocussedItem = items[indexToUse];

    setFocussedItem(newFocussedItem);
    setSelectedItems(newSelectedItems);
    setSelectedItemIndexes(newSelectedItemIndexes);
    setFocusIndex(indexToUse);
    setLastSelectedIndex(indexToUse);
  };

  const onKeyDownWithShortcuts = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "k") {
      focusUp();
      e.preventDefault();
    } else if (e.key === "ArrowDown" || e.key === "j") {
      focusDown();
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (focussedItem) {
        if (!!openItem) {
          openItem(focussedItem);
        } else {
          toggleSelection(getKey(focussedItem));
        }
      }
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "l") {
      if (!!focussedItem) {
        if (!!enterItem) {
          enterItem(focussedItem);
        } else if (!!openItem) {
          openItem(focussedItem);
        } else {
          toggleSelection(getKey(focussedItem));
        }
      }
    } else if (e.key === "ArrowLeft" || e.key === "h") {
      if (!!focussedItem && !!goBack) {
        goBack(focussedItem);
      }
    } else if (e.key === " ") {
      if (selectionBehaviour !== SelectionBehaviour.NONE) {
        toggleSelection();
        e.preventDefault();
      }
    }
  };

  const selectedItem: TItem | undefined =
    selectedItems.length > 0 && !!lastSelectedIndex
      ? items[lastSelectedIndex]
      : undefined;

  return {
    focusIndex,
    focussedItem,
    lastSelectedIndex,
    selectedItems,
    selectedItem,
    selectedItemIndexes,
    toggleSelection,
    clearSelection,
    keyIsDown,
    onKeyDownWithShortcuts,
  };
};

export default useSelectableItemListing;
