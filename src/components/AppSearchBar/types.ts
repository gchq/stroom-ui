import { DocRefType } from "src/api/useDocumentApi/types/base";

export interface Props {
  typeFilters?: string[];
  onChange: (d: DocRefType) => any;
  value?: DocRefType;
  className?: string;
}
