import * as React from "react";
import { useState, useCallback } from "react";

import ThemedModal from "../../../components/ThemedModal";
import Button from "../../../components/Button";
import IconHeader from "../../../components/IconHeader";

export interface Props {
  docRefUuid?: string;
  onCloseDialog: () => void;
}

export const DocumentPermissionEditor = ({
  docRefUuid,
  onCloseDialog
}: Props) => {
  if (!docRefUuid) {
    return null;
  }

  return (
    <ThemedModal
      isOpen={!!docRefUuid}
      header={<IconHeader icon="key" text="Document Permissions" />}
      content={<div>Document Permissions for {docRefUuid}</div>}
      actions={<Button onClick={onCloseDialog} text="Close" />}
    />
  );
};

interface UseDialog {
  componentProps: Props;
  showDialog: (docRefUuid: string) => void;
}

export const useDialog = (): UseDialog => {
  const [docRefUuid, setDocRefUuid] = useState<string | undefined>(undefined);

  return {
    showDialog: useCallback(
      (_docRef: string) => {
        setDocRefUuid(_docRef);
      },
      [setDocRefUuid]
    ),
    componentProps: {
      docRefUuid,
      onCloseDialog: useCallback(() => {
        setDocRefUuid(undefined);
      }, [setDocRefUuid])
    }
  };
};
