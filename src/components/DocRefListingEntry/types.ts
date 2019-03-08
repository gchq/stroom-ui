import { DocRefType, DocRefConsumer } from "../../types";

export interface Props {
  docRef: DocRefType;
  dndIsOver?: boolean;
  dndCanDrop?: boolean;
  openDocRef: DocRefConsumer;
  enterFolder?: DocRefConsumer;
  children?: React.ReactNode;
  selectionToggled: (itemKey: string) => void;
  selectedDocRefs: Array<DocRefType>;
  focussedDocRef?: DocRefType;
}
