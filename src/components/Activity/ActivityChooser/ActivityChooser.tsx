import * as React from "react";

import Button from "components/Button";
// import NewActivityDialog, {
//   useDialog as useCreateNewActivityDialog,
// } from "./NewActivityDialog/NewActivityDialog";
// import ThemedConfirm, {
//   useDialog as useThemedConfirmDialog,
// } from "components/ThemedConfirm";
// import ActivitiesTable, {
//   useTable,
// } from "./ActivitiesTable/ActivitiesTable";
// import {
//   ActivityGroupModalPicker,
//   useActivityGroupModalPicker,
// } from "../ActivityGroups/ActivityGroupPickerDialog";
// import { useActivities, Activity } from "components/Activities/api";
import useAppNavigation from "lib/useAppNavigation";
import useActivities from "../api/useActivities";
import Toggle from "react-toggle";
// import DocRefIconHeader from "components/DocRefIconHeader";
import ThemedConfirm, {
  useDialog as useThemedConfirmDialog,
} from "components/ThemedConfirm";
import ActivityTable, { useTable } from "../ActivityTable";
// import { Activity } from "../api/types";
// import IconHeader from "components/IconHeader";
import useCurrentActivity from "../api/useCurrentActivity";

const ActivityChooser: React.FunctionComponent = () => {
  const [filterable, setFilteringEnabled] = React.useState(false);
  const {
    nav: { goToCreateActivity, goToEditActivity },
  } = useAppNavigation();

  const { activities, deleteActivity } = useActivities();

  const { setCurrentActivity } = useCurrentActivity();

  const { componentProps: tableProps } = useTable(activities, {
    filterable,
  });
  const {
    selectableTableProps: { selectedItem },
  } = tableProps;

  // const {
  //   showDialog: showCreateNewDialog,
  //   componentProps: createNewDialogProps,
  // } = useCreateNewActivityDialog(createActivity);

  // const {
  //   showDialog: showAddToGroupDialog,
  //   componentProps: addToGroupProps,
  // } = useActivityGroupModalPicker({
  //   onConfirm: React.useCallback(
  //     groupName =>
  //       selectedActivities
  //         .map((v: Activity) => v.id)
  //         .forEach((vId: string) => addVolumeToGroup(vId, groupName)),
  //     [addVolumeToGroup, selectedActivities],
  //   ),
  // });

  const onSetClick: React.MouseEventHandler<
    HTMLButtonElement
  > = React.useCallback(() => {
    // console.log("Setting current activity to: ", selectedItem);
    setCurrentActivity(selectedItem);
  }, [setCurrentActivity, selectedItem]);

  const onCreateClick: React.MouseEventHandler<
    HTMLButtonElement
  > = React.useCallback(() => {
    goToCreateActivity();
  }, [goToCreateActivity]);

  const onEditClick: React.MouseEventHandler<
    HTMLButtonElement
  > = React.useCallback(() => {
    if (selectedItem) {
      goToEditActivity(selectedItem.id);
    }
  }, [goToEditActivity, selectedItem]);

  const {
    showDialog: onDeleteClick,
    componentProps: deleteDialogProps,
  } = useThemedConfirmDialog({
    getQuestion: React.useCallback(
      () => `Are you sure you want to delete the selected activities`,
      [],
    ),
    getDetails: React.useCallback(() => selectedItem && selectedItem.id, [
      selectedItem,
    ]),
    onConfirm: React.useCallback(() => {
      deleteActivity(selectedItem.id);
    }, [selectedItem, deleteActivity]),
  });

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__buttons Button__container">
          <Button
            disabled={!selectedItem}
            onClick={onSetClick}
            icon="check"
            text="Set"
          />
          <Button onClick={onCreateClick} icon="plus" text="Create" />
          <Button
            disabled={!selectedItem}
            onClick={onEditClick}
            icon="edit"
            text="Edit"
          />
          <Button
            disabled={!selectedItem}
            onClick={onDeleteClick}
            icon="trash"
            text="Delete"
          />
          <div className="UserSearch-filteringToggle">
            <label>Show filtering</label>
            <Toggle
              icons={false}
              checked={filterable}
              onChange={event => setFilteringEnabled(event.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className="page__search" />
      <div className="page__body">
        <ActivityTable {...tableProps} />
      </div>

      <ThemedConfirm {...deleteDialogProps} />
    </div>
  );
};

export default ActivityChooser;
