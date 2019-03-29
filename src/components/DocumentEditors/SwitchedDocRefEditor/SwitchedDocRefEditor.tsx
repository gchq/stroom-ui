import * as React from 'react';
import {useEffect, useMemo} from 'react';

import FolderExplorer from '../FolderExplorer';
import DictionaryEditor from '../DictionaryEditor';
import PipelineEditor from '../../PipelineEditor';
import XsltEditor from '../XsltEditor';
import PathNotFound from '../../PathNotFound';
import useRecentItems from '../../../lib/useRecentItems';
import IndexEditor from '../IndexEditor';
import {useDocumentTree} from '../../../api/explorer';
import { SwitchedDocRefEditorProps } from '../DocRefEditor';

interface DocRefEditorClasses {
  [docRefType: string] : React.FunctionComponent<SwitchedDocRefEditorProps>
}

const docRefEditorClasses: DocRefEditorClasses = {
  'Folder': FolderExplorer,
  'XSLT': XsltEditor,
  'Dictionary': DictionaryEditor,
  'Pipeline': PipelineEditor,
  'Index': IndexEditor
}

let SwitchedDocRefEditor: React.FunctionComponent<SwitchedDocRefEditorProps> = ({docRefUuid}) => {
  const {addRecentItem} = useRecentItems();
  const {findDocRefWithLineage} = useDocumentTree();
  const {node: docRef} = useMemo(() => findDocRefWithLineage(docRefUuid), [
    findDocRefWithLineage,
    docRefUuid,
  ]);

  useEffect(() => {
    addRecentItem(docRef);
  });

  const EditorClass = docRefEditorClasses[docRef.type];
  if (!!EditorClass) {
    return <EditorClass docRefUuid={docRef.uuid} />
  } else {
    return <PathNotFound message="no editor provided for this doc ref type " />
  }
};

export default SwitchedDocRefEditor;
