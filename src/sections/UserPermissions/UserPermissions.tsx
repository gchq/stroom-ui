import * as React from "react";
import { useEffect, useCallback } from "react";

import { Formik, Field, Form } from "formik";

import useReduxState from "../../lib/useReduxState/useReduxState";
import useApi from "./useUserPermissionsApi";
import { GlobalStoreState } from "../../startup/reducers";
import IconHeader from "../../components/IconHeader";
import UsersTable, {
  useTable
} from "../../components/UserPermissionEditor/UsersTable";
import Button from "../../components/Button";
import NewUserDialog, {
  useDialog as useNewUserDialog
} from "./NewUserDialog/NewUserDialog";
import ThemedConfirm, {
  useDialog as useThemedConfim
} from "../../components/ThemedConfirm";
import useRouter from "../../lib/useRouter";

const LISTING_ID = "user_permissions";

export interface Props {}

interface Values {
  name: string;
  isGroup?: "User" | "Group";
  uuid: string;
}

const UserPermissions = () => {
  const { history } = useRouter();
  const { createUser, findUsers, deleteUser } = useApi();

  // Get data from and subscribe to the store
  const users = useReduxState(
    ({ userPermissions: { users } }: GlobalStoreState) => users[LISTING_ID]
  );

  useEffect(() => {
    findUsers(LISTING_ID);
  }, [findUsers]);

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

  return (
    <div className="UserPermissions">
      <IconHeader icon="users" text="User Permissions" />
      <Formik
        initialValues={{
          name: "",
          uuid: ""
        }}
        onSubmit={() => {}}
        validate={({ name, isGroup, uuid }: Values) =>
          findUsers(LISTING_ID, name, isGroup, uuid)
        }
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <label htmlFor="uuid">UUID</label>
          <Field name="uuid" type="text" />
          <label htmlFor="isGroup">Is Group</label>
          <Field name="isGroup" component="select" placeholder="Group">
            <option value="">N/A</option>
            <option value="Group">Group</option>
            <option value="User">User</option>
          </Field>
        </Form>
      </Formik>
      <div className="UserTable__container">
        <Button text="Create" onClick={showNewDialog} />
        <Button
          text="View/Edit"
          disabled={selectedItems.length !== 1}
          onClick={() =>
            history.push(`/s/userPermissions/${selectedItems[0].uuid}`)
          }
        />
        <Button
          text="Delete"
          disabled={selectedItems.length === 0}
          onClick={showDeleteDialog}
        />

        <ThemedConfirm {...deleteDialogProps} />
        <UsersTable {...tableProps} />
      </div>

      <NewUserDialog {...newDialogComponentProps} />
    </div>
  );
};

export default UserPermissions;
