import * as React from "react";
import { useCallback } from "react";

import { useManageUsers } from "../../api/userGroups";
import { IsGroup } from "../../api/userGroups";
import IconHeader from "../../components/IconHeader";
import UsersTable, { useTable } from "./UsersTable";
import Button from "../../components/Button";
import NewUserDialog, {
  useDialog as useNewUserDialog
} from "./NewUserDialog/NewUserDialog";
import ThemedConfirm, {
  useDialog as useThemedConfim
} from "../../components/ThemedConfirm";
import useForm from "../../lib/useForm";
import IsGroupFilterPicker from "./IsGroupFilterPicker";
import {
  UserGroupPickOrCreateDialog,
  useDialog as useGroupModalDialog
} from "./UserGroupPickOrCreateDialog";
import useAppNavigation from "../AppChrome/useAppNavigation";

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
  const { goToAuthorisationsForUser } = useAppNavigation();
  const {
    findUsers,
    users,
    createUser,
    deleteUser,
    addUserToGroup
  } = useManageUsers();

  const { componentProps: tableProps } = useTable(users);
  const {
    selectableTableProps: { selectedItems: selectedUsers }
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
    getDetails: useCallback(() => selectedUsers.map(v => v.name).join(", "), [
      selectedUsers.map(v => v.uuid)
    ]),
    onConfirm: useCallback(() => {
      selectedUsers.forEach(v => deleteUser(v.uuid));
    }, [selectedUsers.map(v => v.uuid)])
  });

  const { useControlledInputProps, useTextInput } = useForm({
    initialValues: defaultValues,
    onValidate: useCallback(
      ({ name, isGroup, uuid }: Values) => findUsers(name, isGroup, uuid),
      [findUsers]
    )
  });
  const nameProps = useTextInput("name");
  const uuidProps = useTextInput("uuid");

  const isGroupProps = useControlledInputProps<IsGroup>("isGroup");

  const {
    componentProps: userGroupPickerProps,
    showDialog: showGroupPicker
  } = useGroupModalDialog({
    onConfirm: useCallback(
      (groupUuid: string) =>
        selectedUsers.forEach(u => {
          addUserToGroup(u.uuid, groupUuid);
        }),
      [addUserToGroup, selectedUsers]
    )
  });

  const onViewEditClick = useCallback(() => {
    if (selectedUsers.length === 1) {
      goToAuthorisationsForUser(selectedUsers[0].uuid);
    }
  }, [history, selectedUsers]);

  return (
    <div className="Authorisation">
      <IconHeader icon="users" text="User Permissions" />

      <form>
        <label htmlFor="name">Name</label>
        <input {...nameProps} />
        <label htmlFor="uuid">UUID</label>
        <input {...uuidProps} />
        <label htmlFor="isGroup">Is Group</label>
        <IsGroupFilterPicker {...isGroupProps} />
      </form>

      <div className="UserTable__container">
        <Button text="Create" onClick={showNewDialog} />
        <Button
          text="View/Edit"
          disabled={selectedUsers.length !== 1}
          onClick={onViewEditClick}
        />
        <Button
          text="Add to Group"
          disabled={
            selectedUsers.length === 0 || !!selectedUsers.find(u => u.isGroup)
          }
          onClick={showGroupPicker}
        />
        <Button
          text="Delete"
          disabled={selectedUsers.length === 0}
          onClick={showDeleteDialog}
        />

        <UsersTable {...tableProps} />
      </div>

      <UserGroupPickOrCreateDialog {...userGroupPickerProps} />
      <ThemedConfirm {...deleteDialogProps} />
      <NewUserDialog {...newDialogComponentProps} />
    </div>
  );
};

export default Authorisation;
