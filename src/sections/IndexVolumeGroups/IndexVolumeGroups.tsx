import * as React from "react";
import { useState, useEffect } from "react";

import useReduxState from "../../lib/useReduxState/useReduxState";
import { useGetIndexVolumeGroups, useDeleteIndexVolumeGroup } from "./client";
import IndexVolumeGroupsTable from "./IndexVolumeGroupsTable";
import { IndexVolumeGroup } from "../../types";
import Button from "../../components/Button";
import NewIndexVolumeGroupDialog, {
  useDialog as useNewDialog
} from "./NewIndexVolumeGroupDialog";
import ThemedConfirm, {
  useDialog as useConfirmDialog
} from "../../components/ThemedConfirm";
import IconHeader from "../../components/IconHeader";
import useHistory from "../../lib/useHistory";

export interface Props {}

const IndexVolumeGroups = () => {
  const history = useHistory();

  const { groups } = useReduxState(({ indexVolumeGroups: { groups } }) => ({
    groups
  }));
  const getIndexVolumeGroups = useGetIndexVolumeGroups();
  const deleteIndexVolumeGroup = useDeleteIndexVolumeGroup();

  useEffect(() => {
    getIndexVolumeGroups();
  }, []);
  const [selectedGroup, setSelectedGroup] = useState<
    IndexVolumeGroup | undefined
  >(undefined);

  const onSelection = (selectedName?: string) => {
    setSelectedGroup(
      groups.find((u: IndexVolumeGroup) => u.name === selectedName)
    );
  };

  const {
    showDialog: showNewDialog,
    componentProps: newDialogComponentProps
  } = useNewDialog();

  const {
    showDialog: showDeleteDialog,
    componentProps: deleteDialogComponentProps
  } = useConfirmDialog({
    question: selectedGroup
      ? `Are you sure you want to delete ${selectedGroup.name}`
      : "no group?",
    onConfirm: () => {
      deleteIndexVolumeGroup(selectedGroup!.name);
    }
  });

  return (
    <div>
      <IconHeader text="Index Volume Groups" icon="database" />

      <Button text="Create" onClick={showNewDialog} />
      <Button
        text="View/Edit"
        disabled={!selectedGroup}
        onClick={() =>
          history.push(`/s/indexing/groups/${selectedGroup!.name}`)
        }
      />
      <Button
        text="Delete"
        disabled={!selectedGroup}
        onClick={() => showDeleteDialog()}
      />

      <NewIndexVolumeGroupDialog {...newDialogComponentProps} />

      <ThemedConfirm {...deleteDialogComponentProps} />

      <IndexVolumeGroupsTable {...{ groups, selectedGroup, onSelection }} />
    </div>
  );
};

export default IndexVolumeGroups;
