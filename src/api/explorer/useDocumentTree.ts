import { useContext } from "react";
import DocumentTreeContext from "./DocumentTreeContext";

const useDocumentTree = () => useContext(DocumentTreeContext);

export default useDocumentTree;
