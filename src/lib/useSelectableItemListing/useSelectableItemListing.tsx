import { useState, useCallback } from "react";
import useKeyIsDown from "../useKeyIsDown";
import { InProps, OutProps } from "./types";
import { SelectionBehaviour } from "./enums";

const defaultOnSelectionChanged = <T extends {}>(selectedItems: Array<T>) => {
  console.log("Selection Changed", selectedItems);
};

function useSelectableItemListing<TItem>({
  getKey,
  items,
  openItem,
  enterItem,
  goBack,
  selectionBehaviour = SelectionBehaviour.NONE,
  onSelectionChanged = defaultOnSelectionChanged
}: InProps<TItem>): OutProps<TItem> {
  const keyIsDown = useKeyIsDown();

  // I think some of these state things should be recalculated in the event of
  // the underlying items changing....may need to add a 'useEffect' which does
  // checking of everything
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [focussedItem, setFocussedItem] = useState<TItem | undefined>(
    undefined
  );
  const [lastSelectedIndex, setLastSelectedIndex] = useState<
    number | undefined
  >(-1);
  const [selectedItems, setSelectedItemsState] = useState<Array<TItem>>([]);
  const [selectedItemIndexes, setSelectedItemIndexes] = useState<Set<number>>(
    new Set()
  );
  const setSelectedItems = useCallback(
    (items: Array<TItem>) => {
      setSelectedItemsState(items);
      onSelectionChanged(items);
    },
    [setSelectedItemsState, onSelectionChanged]
  );

  const focusChanged = (direction: number) => () => {
    let nextIndex = 0;
    if (focusIndex !== -1) {
      nextIndex = (items.length + (focusIndex + direction)) % items.length;
    }

    setFocusIndex(nextIndex);
    setFocussedItem(items[nextIndex]);
  };
  const focusUp = focusChanged(-1);
  const focusDown = focusChanged(+1);

  const clearSelection = useCallback(() => {
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

    const newSelectedItems: Array<any> = [];
    newSelectedItemIndexes.forEach((i: number) =>
      newSelectedItems.push(items[i])
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

  return {
    focusIndex,
    focussedItem,
    lastSelectedIndex,
    selectedItems,
    selectedItem:
      selectedItems.length > 0 && !!lastSelectedIndex
        ? selectedItems[lastSelectedIndex]
        : undefined,
    selectedItemIndexes,
    toggleSelection,
    clearSelection,
    keyIsDown,
    onKeyDownWithShortcuts
  };
}

export default useSelectableItemListing;
