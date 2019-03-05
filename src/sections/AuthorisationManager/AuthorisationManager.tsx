import * as React from "react";
import { useCallback } from "react";

import useApi, { useFindUsers } from "../../api/userGroups";
import { IsGroup } from "../../api/userGroups/useApi";
import IconHeader from "../../components/IconHeader";
import UsersTable, { useTable } from "./UsersTable";
import Button from "../../components/Button";
import NewUserDialog, {
  useDialog as useNewUserDialog
} from "./NewUserDialog/NewUserDialog";
import ThemedConfirm, {
  useDialog as useThemedConfim
} from "../../components/ThemedConfirm";
import useRouter from "../../lib/useRouter";
import useForm from "../../lib/useForm";
import IsGroupPicker from "./IsGroupPicker/IsGroupPicker";

export interface Props {}

interface Values {
  name: string;
  isGroup?: IsGroup;
  uuid: string;
}

const defaultValues: Values = {
  name: "",
  uuid: "",
  isGroup: ""
};

const Authorisation = () => {
  const { history } = useRouter();
  const { findUsers, users } = useFindUsers();
  const { createUser, deleteUser } = useApi();

  const { componentProps: tableProps } = useTable(users);
  const {
    selectableTableProps: { selectedItems }
  } = tableProps;

  const {
    componentProps: newDialogComponentProps,
    showDialog: showNewDialog
  } = useNewUserDialog(createUser);
  const {
    componentProps: deleteDialogProps,
    showDialog: showDeleteDialog
  } = useThemedConfim({
    getQuestion: useCallback(() => `Are you sure you want to delete user`, []),
    getDetails: useCallback(() => selectedItems.map(v => v.name).join(", "), [
      selectedItems.map(v => v.uuid)
    ]),
    onConfirm: useCallback(() => {
      selectedItems.forEach(v => deleteUser(v.uuid));
    }, [selectedItems.map(v => v.uuid)])
  });

  const {
    generateControlledInputProps,
    inputProps: {
      text: { name: nameProps, uuid: uuidProps }
    }
  } = useForm({
    initialValues: defaultValues,
    inputs: { text: ["name", "uuid"] },
    onValidate: ({ name, isGroup, uuid }: Values) =>
      findUsers(name, isGroup, uuid)
  });

  const isGroupProps = generateControlledInputProps<IsGroup>("isGroup");

  return (
    <div className="Authorisation">
      <IconHeader icon="users" text="User Permissions" />

      <form>
        <label htmlFor="name">Name</label>
        <input {...nameProps} />
        <label htmlFor="uuid">UUID</label>
        <input {...uuidProps} />
        <label htmlFor="isGroup">Is Group</label>
        <IsGroupPicker {...isGroupProps} />
      </form>

      <div className="UserTable__container">
        <Button text="Create" onClick={showNewDialog} />
        <Button
          text="View/Edit"
          disabled={selectedItems.length !== 1}
          onClick={() =>
            history.push(`/s/authorisation/${selectedItems[0].uuid}`)
          }
        />
        <Button
          text="Delete"
          disabled={selectedItems.length === 0}
          onClick={showDeleteDialog}
        />

        <UsersTable {...tableProps} />
      </div>

      <ThemedConfirm {...deleteDialogProps} />
      <NewUserDialog {...newDialogComponentProps} />
    </div>
  );
};

export default Authorisation;
