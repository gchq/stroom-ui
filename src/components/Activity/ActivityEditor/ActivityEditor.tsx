import * as React from "react";

import IconHeader from "components/IconHeader";
import Button from "components/Button";
import useRouter from "lib/useRouter";
import useActivity from "../api/useActivity";
// import {
//   useTable as useActivityGroupTable,
//   ActivityGroupNamesTable,
// } from "../../ActivityGroups/ActivityGroupNamesTable";
// import {
//   useActivityGroupModalPicker,
//   ActivityGroupModalPicker,
// } from "../../ActivityGroups/ActivityGroupPickerDialog";
// import ThemedConfirm, {
//   useDialog as useConfirmDialog,
// } from "components/ThemedConfirm";
import Loader from "components/Loader";

interface Props {
  activityId: string;
}

const ActivityEditor: React.FunctionComponent<Props> = ({ activityId }) => {
  const { history } = useRouter();

  const { activity } = useActivity(activityId);

  // const { componentProps: tableProps } = useActivityGroupTable(groupNames);

  // const {
  //   selectableTableProps: { selectedItems },
  // } = tableProps;

  // const {
  //   showDialog: showRemoveDialog,
  //   componentProps: removeDialogProps,
  // } = useConfirmDialog({
  //   onConfirm: React.useCallback(() => selectedItems.forEach(removeFromGroup), [
  //     selectedItems,
  //     removeFromGroup,
  //   ]),
  //   getQuestion: React.useCallback(
  //     () => "Remove volume from selected groups?",
  //     [],
  //   ),
  //   getDetails: React.useCallback(() => selectedItems.join(", "), [
  //     selectedItems,
  //   ]),
  // });

  // const {
  //   componentProps: activityGroupPickerProps,
  //   showDialog: showActivityGroupPicker,
  // } = useActivityGroupModalPicker({
  //   onConfirm: React.useCallback((groupName: string) => addToGroup(groupName), [
  //     addToGroup,
  //   ]),
  // });

  if (!activity) {
    return <Loader message={`Loading Activity ${activityId}`} />;
  }

  return (
    <div>
      <IconHeader icon="tasks" text={`Activity - ${activity.id}`} />

      <Button text="Back" onClick={history.goBack} />

      {/* <ThemedConfirm {...removeDialogProps} /> */}
    </div>
  );
};

export default ActivityEditor;
