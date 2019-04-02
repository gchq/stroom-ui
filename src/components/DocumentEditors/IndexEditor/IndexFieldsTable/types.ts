import { TableOutProps } from "src/lib/useSelectableItemListing";
import { IndexField } from "src/types";

export interface Props {
  fields: IndexField[];
  selectableTableProps: TableOutProps<IndexField>;
}

export interface UseTable {
  componentProps: Props;
}
