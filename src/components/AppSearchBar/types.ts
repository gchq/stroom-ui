import { DocRefType } from "src/components/DocumentEditors/useDocumentApi/types/base";

export interface Props {
  typeFilters?: string[];
  onChange: (d: DocRefType) => any;
  value?: DocRefType;
  className?: string;
}
