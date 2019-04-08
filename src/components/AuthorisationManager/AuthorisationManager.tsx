import * as React from "react";

import { useManageUsers } from "src/api/userGroups";
import IconHeader from "src/components/IconHeader";
import UsersTable, { useTable } from "./UsersTable";
import Button from "src/components/Button";
import NewUserDialog, {
  useDialog as useNewUserDialog,
} from "./NewUserDialog/NewUserDialog";
import ThemedConfirm, {
  useDialog as useThemedConfim,
} from "src/components/ThemedConfirm";
import useForm from "src/lib/useForm";
import {
  UserGroupPickOrCreateDialog,
  useDialog as useGroupModalDialog,
} from "./UserGroupPickOrCreateDialog";
import useAppNavigation from "../AppChrome/useAppNavigation";

interface Props {
  isGroup: boolean;
}

interface Values {
  name: string;
  uuid: string;
}

const defaultValues: Values = {
  name: "",
  uuid: "",
};

const Authorisation: React.FunctionComponent<Props> = ({ isGroup }) => {
  const { goToAuthorisationsForUser } = useAppNavigation();
  const {
    findUsers,
    users,
    createUser,
    deleteUser,
    addUserToGroup,
  } = useManageUsers();

  const { componentProps: tableProps } = useTable(users);
  const {
    selectableTableProps: { selectedItems: selectedUsers },
  } = tableProps;

  const {
    componentProps: newDialogComponentProps,
    showDialog: showNewDialog,
  } = useNewUserDialog({ isGroup, onCreateUser: createUser });
  const {
    componentProps: deleteDialogProps,
    showDialog: showDeleteDialog,
  } = useThemedConfim({
    getQuestion: React.useCallback(
      () => `Are you sure you want to delete user`,
      [],
    ),
    getDetails: React.useCallback(
      () => selectedUsers.map(v => v.name).join(", "),
      [selectedUsers.map(v => v.uuid)],
    ),
    onConfirm: React.useCallback(() => {
      selectedUsers.forEach(v => deleteUser(v.uuid));
    }, [selectedUsers.map(v => v.uuid)]),
  });

  const { useTextInput } = useForm({
    initialValues: defaultValues,
    onValidate: React.useCallback(
      ({ name, uuid }: Values) => findUsers(name, isGroup, uuid),
      [findUsers],
    ),
  });
  const nameProps = useTextInput("name");
  const uuidProps = useTextInput("uuid");

  const {
    componentProps: userGroupPickerProps,
    showDialog: showGroupPicker,
  } = useGroupModalDialog({
    onConfirm: React.useCallback(
      (groupUuid: string) =>
        selectedUsers.forEach(u => {
          addUserToGroup(u.uuid, groupUuid);
        }),
      [addUserToGroup, selectedUsers],
    ),
  });

  const onViewEditClick = React.useCallback(() => {
    if (selectedUsers.length === 1) {
      goToAuthorisationsForUser(selectedUsers[0].uuid);
    }
  }, [history, selectedUsers]);

  return (
    <div className="Authorisation">
      <IconHeader icon="users" text={`${isGroup} Permissions`} />

      <form>
        <label htmlFor="name">Name</label>
        <input {...nameProps} />
        <label htmlFor="uuid">UUID</label>
        <input {...uuidProps} />
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
