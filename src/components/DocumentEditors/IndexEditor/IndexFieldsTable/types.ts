import { TableOutProps } from "src/lib/useSelectableItemListing";
import { IndexField } from "src/api/useDocumentApi/types/indexDoc";

export interface Props {
  fields: IndexField[];
  selectableTableProps: TableOutProps<IndexField>;
}

export interface UseTable {
  componentProps: Props;
}
