import { DocumentBase, DocRefType } from "./base";

export interface DictionaryDoc extends DocumentBase<"DictionaryDoc"> {
  description?: string;
  data?: string;
  imports?: DocRefType[];
}
