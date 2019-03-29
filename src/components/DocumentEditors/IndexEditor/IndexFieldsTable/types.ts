import { TableOutProps } from "../../../../lib/useSelectableItemListing";
import { IndexField } from "../../../../types";

export interface Props {
  fields: IndexField[];
  selectableTableProps: TableOutProps<IndexField>;
}

export interface UseTable {
  componentProps: Props;
}
