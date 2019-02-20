import * as React from "react";
import { useEffect } from "react";

import useReduxState from "../../lib/useReduxState/useReduxState";
import useApi from "./useIndexVolumeGroupApi";
import IndexVolumeGroupsTable, { useTable } from "./IndexVolumeGroupsTable";
import Button from "../../components/Button";
import NewIndexVolumeGroupDialog, {
  useDialog as useNewDialog
} from "./NewIndexVolumeGroupDialog";
import ThemedConfirm, {
  useDialog as useConfirmDialog
} from "../../components/ThemedConfirm";
import IconHeader from "../../components/IconHeader";
import useRouter from "../../lib/useRouter";

export interface Props {}

const IndexVolumeGroups = () => {
  const { history } = useRouter();

  const { groups } = useReduxState(({ indexVolumeGroups: { groups } }) => ({
    groups
  }));
  const api = useApi();
  const { componentProps: tableProps } = useTable(groups);

  useEffect(() => {
    api.getIndexVolumeGroups();
  }, []);

  const {
    showDialog: showNewDialog,
    componentProps: newDialogComponentProps
  } = useNewDialog();

  const {
    showDialog: showDeleteDialog,
    componentProps: deleteDialogComponentProps
  } = useConfirmDialog({
    question: tableProps.selectedGroup
      ? `Are you sure you want to delete ${tableProps.selectedGroup.name}`
      : "no group?",
    onConfirm: () => {
      api.deleteIndexVolumeGroup(tableProps.selectedGroup!.name);
    }
  });

  return (
    <div>
      <IconHeader text="Index Volume Groups" icon="database" />

      <Button text="Create" onClick={showNewDialog} />
      <Button
        text="View/Edit"
        disabled={!tableProps.selectedGroup}
        onClick={() =>
          history.push(`/s/indexing/groups/${tableProps.selectedGroup!.name}`)
        }
      />
      <Button
        text="Delete"
        disabled={!tableProps.selectedGroup}
        onClick={() => showDeleteDialog()}
      />

      <NewIndexVolumeGroupDialog {...newDialogComponentProps} />

      <ThemedConfirm {...deleteDialogComponentProps} />

      <IndexVolumeGroupsTable {...tableProps} />
    </div>
  );
};

export default IndexVolumeGroups;
