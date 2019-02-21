import * as React from "react";
import { useState } from "react";

import { useIndexVolumeGroupPicker } from ".";
import ThemedModal from "../../components/ThemedModal";
import IconHeader from "../../components/IconHeader";
import IndexVolumeGroupPicker from "./IndexVolumeGroupPicker";
import { DialogActionButtons } from "../../components/Button";

export interface BaseProps {
  onConfirm: (groupName: string) => void;
}

export interface Props extends BaseProps {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
}

export const IndexVolumeGroupModalPicker = ({
  onConfirm,
  isOpen,
  setIsOpen
}: Props) => {
  const volumeGroupPickerProps = useIndexVolumeGroupPicker();
  const {
    reset: resetVolumeGroup,
    value: volumeGroupName
  } = volumeGroupPickerProps;

  return (
    <ThemedModal
      isOpen={isOpen}
      header={<IconHeader icon="plus" text="Add Volume to Group" />}
      content={<IndexVolumeGroupPicker {...volumeGroupPickerProps} />}
      actions={
        <DialogActionButtons
          onConfirm={() => {
            if (!!volumeGroupName) {
              onConfirm(volumeGroupName);
            }
            setIsOpen(false);
          }}
          onCancel={() => {
            resetVolumeGroup();
            setIsOpen(false);
          }}
        />
      }
    />
  );
};

export interface UseDialog {
  componentProps: Props;
  showDialog: () => void;
}

export const useDialog = (props: BaseProps): UseDialog => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    componentProps: {
      ...props,
      isOpen,
      setIsOpen
    },
    showDialog: () => setIsOpen(true)
  };
};

export default IndexVolumeGroupModalPicker;
