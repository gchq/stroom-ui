import * as React from "react";
import { useState, useEffect, useCallback } from "react";

import { Formik, Field, Form } from "formik";

import useReduxState from "../../lib/useReduxState/useReduxState";
import useApi from "./useUserPermissionsApi";
import { GlobalStoreState } from "../../startup/reducers";
import { User } from "../../types";
import IconHeader from "../../components/IconHeader";
import UsersTable from "./UsersTable";
import Button from "../../components/Button";
import NewUserDialog, { useDialog as useNewUserDialog } from "./NewUserDialog";
import ThemedConfirm, {
  useDialog as useThemedConfim
} from "../../components/ThemedConfirm";
import useRouter from "../../lib/useRouter";

const LISTING_ID = "user_permissions";

export interface Props {}

interface Values {
  name: string;
  isGroup?: boolean;
  uuid: string;
}

const UserPermissions = () => {
  const { history } = useRouter();
  const api = useApi();
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  // Get data from and subscribe to the store
  const users = useReduxState(
    ({ userPermissions: { users } }: GlobalStoreState) => users[LISTING_ID]
  );

  const onSelection = (selectedUuid: string) => {
    setSelectedUser(users.find((u: User) => u.uuid === selectedUuid));
  };

  useEffect(() => {
    api.findUsers(LISTING_ID);
  }, []);

  const {
    componentProps: newDialogComponentProps,
    showDialog: showNewDialog
  } = useNewUserDialog();
  const {
    componentProps: deleteDialogProps,
    showDialog: showDeleteDialog
  } = useThemedConfim({
    getQuestion: useCallback(() => `Are you sure you want to delete user`, []),
    getDetails: useCallback(
      () => (selectedUser ? selectedUser.name : "no user"),
      [selectedUser]
    ),
    onConfirm: useCallback(() => {
      api.deleteUser(selectedUser!.uuid);
    }, [selectedUser])
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
          api.findUsers(LISTING_ID, name, isGroup, uuid)
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
            <option value="true">Group</option>
            <option value="false">User</option>
          </Field>
        </Form>
      </Formik>
      <div className="UserTable__container">
        <Button text="Create" onClick={showNewDialog} />
        <Button
          text="View/Edit"
          disabled={!selectedUser}
          onClick={() =>
            history.push(`/s/userPermissions/${selectedUser!.uuid}`)
          }
        />
        <Button
          text="Delete"
          disabled={!selectedUser}
          onClick={showDeleteDialog}
        />

        <ThemedConfirm {...deleteDialogProps} />
        <UsersTable {...{ users, onSelection, selectedUser }} />
      </div>

      <NewUserDialog {...newDialogComponentProps} />
    </div>
  );
};

export default UserPermissions;
