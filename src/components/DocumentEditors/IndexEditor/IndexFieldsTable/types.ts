import { TableOutProps } from "lib/useSelectableItemListing";
import { IndexField } from "components/DocumentEditors/useDocumentApi/types/indexDoc";

export interface Props {
  fields: IndexField[];
  selectableTableProps: TableOutProps<IndexField>;
}

export interface UseTable {
  componentProps: Props;
}
