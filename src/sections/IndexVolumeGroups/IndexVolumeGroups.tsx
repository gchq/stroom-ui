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
  const {
    selectableTableProps: { selectedItems }
  } = tableProps;

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
    question: `Are you sure you want to delete ${selectedItems
      .map(v => v.name)
      .join(",")}`,
    onConfirm: () => {
      selectedItems.forEach(g => api.deleteIndexVolumeGroup(g.name));
    }
  });

  return (
    <div>
      <IconHeader text="Index Volume Groups" icon="database" />

      <Button text="Create" onClick={showNewDialog} />
      <Button
        text="View/Edit"
        disabled={selectedItems.length !== 1}
        onClick={() =>
          history.push(`/s/indexing/groups/${selectedItems[0].name}`)
        }
      />
      <Button
        text="Delete"
        disabled={selectedItems.length === 0}
        onClick={() => showDeleteDialog()}
      />

      <NewIndexVolumeGroupDialog {...newDialogComponentProps} />

      <ThemedConfirm {...deleteDialogComponentProps} />

      <IndexVolumeGroupsTable {...tableProps} />
    </div>
  );
};

export default IndexVolumeGroups;
