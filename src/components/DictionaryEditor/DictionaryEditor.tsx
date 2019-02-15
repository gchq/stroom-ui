import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "redux-react-hook";

import useReduxState from "../../lib/useReduxState/useReduxState";
import Loader from "../Loader";
import { Props as ButtonProps } from "../Button";
import DocRefEditor from "../DocRefEditor";
import { useFetchDictionary, useSaveDictionary } from "./client";
import { actionCreators } from "./redux";

const { dictionaryUpdated } = actionCreators;

export interface Props {
  dictionaryUuid: string;
}

const DictionaryEditor = ({ dictionaryUuid }: Props) => {
  // Get data from and subscribe to the store
  const dispatch = useDispatch();
  const { dictionaryState } = useReduxState(
    ({ dictionaryEditor }) => ({
      dictionaryState: dictionaryEditor[dictionaryUuid]
    }),
    [dictionaryUuid]
  );
  const fetchDictionary = useFetchDictionary();
  const saveDictionary = useSaveDictionary();

  useEffect(() => {
    fetchDictionary(dictionaryUuid);
  });

  if (!dictionaryState) {
    return <Loader message={`Loading Dictionary ${dictionaryUuid}`} />;
  }

  const { dictionary, isDirty, isSaving } = dictionaryState;

  const actionBarItems: Array<ButtonProps> = [
    {
      icon: "save",
      disabled: !(isDirty || isSaving),
      title: isSaving ? "Saving..." : isDirty ? "Save" : "Saved",
      onClick: () => saveDictionary(dictionaryUuid)
    }
  ];

  return (
    <DocRefEditor docRefUuid={dictionaryUuid} actionBarItems={actionBarItems}>
      <textarea
        value={dictionary && dictionary.data}
        onChange={({ target: { value } }) =>
          dispatch(dictionaryUpdated(dictionaryUuid, { data: value }))
        }
      />
    </DocRefEditor>
  );
};

export default DictionaryEditor;
