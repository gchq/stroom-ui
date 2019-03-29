import * as React from 'react';

import Loader from '../../Loader';
import DocRefEditor, {useDocRefEditor} from '../DocRefEditor';
import {useApi} from '../../../api/dictionaryDocument';
import {Dictionary} from '../../../types';

interface Props {
  dictionaryUuid: string;
}

const DictionaryEditor: React.FunctionComponent<Props> = ({
  dictionaryUuid,
}: Props) => {
  // Get data from and subscribe to the store
  const documentApi = useApi();

  const {onDocumentChange, editorProps} = useDocRefEditor<Dictionary>({
    docRefUuid: dictionaryUuid,
    documentApi,
  });
  const {docRefContents} = editorProps;

  if (!docRefContents) {
    return <Loader message={`Loading Dictionary ${dictionaryUuid}`} />;
  }

  return (
    <DocRefEditor {...editorProps}>
      <textarea
        value={docRefContents.data}
        onChange={({target: {value}}) => onDocumentChange({data: value})}
      />
    </DocRefEditor>
  );
};

export default DictionaryEditor;
