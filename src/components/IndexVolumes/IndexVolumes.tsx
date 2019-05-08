import * as React from "react";

import Button from "components/Button";
import NewIndexVolumeDialog, {
  useDialog as useCreateNewIndexVolumeDialog,
} from "./NewIndexVolumeDialog/NewIndexVolumeDialog";
import ThemedConfirm, {
  useDialog as useThemedConfirmDialog,
} from "components/ThemedConfirm";
import IndexVolumesTable, {
  useTable,
} from "./IndexVolumesTable/IndexVolumesTable";
import {
  IndexVolumeGroupModalPicker,
  useIndexVolumeGroupModalPicker,
} from "../IndexVolumeGroups/IndexVolumeGroupPickerDialog";
import { useIndexVolumes, IndexVolume } from "components/IndexVolumes/api";
import useAppNavigation from "../../lib/useAppNavigation/useAppNavigation";
import Toggle from "react-toggle";
import DocRefIconHeader from "components/DocRefIconHeader";

const IndexVolumes: React.FunctionComponent = () => {
  const [filterable, setFilteringEnabled] = React.useState(false);
  const { goToIndexVolume } = useAppNavigation();

  const {
    indexVolumes,
    createIndexVolume,
    deleteIndexVolume,
    addVolumeToGroup,
  } = useIndexVolumes();

  const { componentProps: tableProps } = useTable(indexVolumes, {
    filterable,
  });
  const {
    selectableTableProps: { selectedItems: selectedIndexVolumes },
  } = tableProps;

  const {
    showDialog: showCreateNewDialog,
    componentProps: createNewDialogProps,
  } = useCreateNewIndexVolumeDialog(createIndexVolume);

  const {
    showDialog: showDeleteDialog,
    componentProps: deleteDialogProps,
  } = useThemedConfirmDialog({
    getQuestion: React.useCallback(
      () => `Are you sure you want to delete selected volumes`,
      [],
    ),
    getDetails: React.useCallback(
      () => selectedIndexVolumes.map((v: IndexVolume) => v.id).join(", "),
      [selectedIndexVolumes],
    ),
    onConfirm: React.useCallback(() => {
      selectedIndexVolumes.forEach((v: IndexVolume) => deleteIndexVolume(v.id));
    }, [selectedIndexVolumes, deleteIndexVolume]),
  });

  const {
    showDialog: showAddToGroupDialog,
    componentProps: addToGroupProps,
  } = useIndexVolumeGroupModalPicker({
    onConfirm: React.useCallback(
      groupName =>
        selectedIndexVolumes
          .map((v: IndexVolume) => v.id)
          .forEach((vId: string) => addVolumeToGroup(vId, groupName)),
      [addVolumeToGroup, selectedIndexVolumes],
    ),
  });

  const onViewClick: React.MouseEventHandler<
    HTMLButtonElement
  > = React.useCallback(() => {
    if (selectedIndexVolumes.length === 1) {
      goToIndexVolume(selectedIndexVolumes[0].id);
    }
  }, [goToIndexVolume, selectedIndexVolumes]);

  return (
    <div className="page">
      <div className="page__header">
        <DocRefIconHeader text="Index Volumes" docRefType="Index" />
        <div className="page__buttons">
          <Button onClick={showCreateNewDialog} icon="plus" text="Create" />
          <Button
            disabled={selectedIndexVolumes.length !== 1}
            onClick={onViewClick}
            icon="edit"
            text="View/edit"
          />
          <Button
            disabled={selectedIndexVolumes.length !== 1}
            onClick={showDeleteDialog}
            icon="trash"
            text="Delete"
          />
          <Button
            text="To Group"
            icon="plus"
            disabled={selectedIndexVolumes.length === 0}
            onClick={showAddToGroupDialog}
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
        <IndexVolumesTable {...tableProps} />
      </div>
      <IndexVolumeGroupModalPicker {...addToGroupProps} />
      <NewIndexVolumeDialog {...createNewDialogProps} />
      <ThemedConfirm {...deleteDialogProps} />
    </div>
  );
};

export default IndexVolumes;
