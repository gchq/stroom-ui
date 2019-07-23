import * as React from "react";

import IndexVolumeGroupPicker, {
  usePicker,
} from "../IndexVolumeGroupPicker/IndexVolumeGroupPicker";
import ThemedModal from "components/ThemedModal";
import IconHeader from "components/IconHeader";
import DialogActionButtons from "components/DialogActionButtons";
import { PickerBaseProps } from "../IndexVolumeGroupPicker/types";

interface BaseProps extends PickerBaseProps {
  onConfirm: (groupName: string) => void;
}

interface Props extends BaseProps {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
}

export const IndexVolumeGroupModalPicker: React.FunctionComponent<Props> = ({
  onConfirm,
  isOpen,
  setIsOpen,
  valuesToFilterOut,
}) => {
  const volumeGroupPickerProps = usePicker({ valuesToFilterOut });
  const {
    reset: resetVolumeGroup,
    value: volumeGroupName,
  } = volumeGroupPickerProps;

  const onClose = React.useCallback(() => {
    resetVolumeGroup();
    setIsOpen(false);
  }, [resetVolumeGroup, setIsOpen]);

  const onConfirmLocal = React.useCallback(() => {
    if (!!volumeGroupName) {
      onConfirm(volumeGroupName);
    }
    onClose();
  }, [volumeGroupName, onClose, onConfirm]);

  return (
    <ThemedModal
      isOpen={isOpen}
      header={<IconHeader icon="plus" text="Add Volume to Group" />}
      content={<IndexVolumeGroupPicker {...volumeGroupPickerProps} />}
      actions={
        <DialogActionButtons onConfirm={onConfirmLocal} onCancel={onClose} />
      }
    />
  );
};

interface UseDialog {
  componentProps: Props;
  showDialog: () => void;
}

export const useDialog = (props: BaseProps): UseDialog => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return {
    componentProps: {
      ...props,
      isOpen,
      setIsOpen,
    },
    showDialog: () => setIsOpen(true),
  };
};

export default IndexVolumeGroupModalPicker;
