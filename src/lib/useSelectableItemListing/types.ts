import { TableProps } from "react-table";

import { KeyDownState } from "../useKeyIsDown";
import { SelectionBehaviour } from "./enums";

export interface InProps<TItem> {
  getKey: (x: TItem) => string;
  items: Array<TItem>;
  openItem?: (i: TItem) => void;
  enterItem?: (i: TItem) => void;
  goBack?: (i: TItem) => void;
  selectionBehaviour?: SelectionBehaviour;
}

export interface OutProps<TItem> {
  focusIndex: number;
  focussedItem?: any;
  lastSelectedIndex?: number;
  selectedItem?: TItem;
  selectedItems: Array<TItem>;
  selectedItemIndexes: Set<number>;
  toggleSelection: (itemKey: string) => void;
  clearSelection: () => void;
  onKeyDownWithShortcuts: React.KeyboardEventHandler<HTMLDivElement>;
  keyIsDown: KeyDownState;
}

export interface TableOutProps<TItem> extends OutProps<TItem> {
  tableProps: Partial<TableProps>;
}
