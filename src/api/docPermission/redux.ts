import { DocRefType, DocumentPermissions, User } from "../../types";
import { Action } from "redux";
import {
  genUseActionCreators,
  prepareReducer
} from "../../lib/redux-actions-ts";

export interface StoreState {
  permissionsByDocType: {
    [docType: string]: Array<string>;
  };
  permissionsByDocUuidThenUserUuid: {
    [docUuid: string]: {
      [userUuid: string]: Array<string>;
    };
  };
  userIsGroup: {
    [userUuid: string]: boolean;
  };
}

const defaultState: StoreState = {
  permissionsByDocType: {},
  permissionsByDocUuidThenUserUuid: {},
  userIsGroup: {}
};

const PERMISSIONS_FOR_DOC_TYPE_RECEIVED = "PERMISSIONS_FOR_DOC_TYPE_RECEIVED";
const PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED =
  "PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED";
const PERMISSIONS_FOR_DOCUMENT_RECEIVED = "PERMISSIONS_FOR_DOCUMENT_RECEIVED";
const DOCUMENT_PERMISSION_ADDED = "DOCUMENT_PERMISSION_ADDED";
const DOCUMENT_PERMISSION_REMOVED = "DOCUMENT_PERMISSION_REMOVED";
const DOCUMENT_PERMISSIONS_CLEARED = "DOCUMENT_PERMISSIONS_CLEARED";

interface PermissionsForDocTypeReceivedAction
  extends Action<"PERMISSIONS_FOR_DOC_TYPE_RECEIVED"> {
  docType: string;
  permissions: Array<string>;
}

interface PermissionsForDocumentForUserReceivedAction
  extends Action<"PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED"> {
  docRef: DocRefType;
  user: User;
  permissions: Array<string>;
}

interface PermissionsForDocumentReceivedAction
  extends Action<"PERMISSIONS_FOR_DOCUMENT_RECEIVED"> {
  docRef: DocRefType;
  documentPermissions: DocumentPermissions;
}

interface DocumentPermissionAction {
  docRef: DocRefType;
  user: User;
  permissionName: string;
}

interface DocumentPermissionAddedAction
  extends Action<"DOCUMENT_PERMISSION_ADDED">,
    DocumentPermissionAction {}
interface DocumentPermissionRemovedAction
  extends Action<"DOCUMENT_PERMISSION_REMOVED">,
    DocumentPermissionAction {}
interface DocumentPermissionsClearedAction
  extends Action<"DOCUMENT_PERMISSIONS_CLEARED"> {
  docRef: DocRefType;
}

export const useActionCreators = genUseActionCreators({
  permissionsForDocTypeReceived: (
    docType: string,
    permissions: Array<string>
  ): PermissionsForDocTypeReceivedAction => ({
    type: PERMISSIONS_FOR_DOC_TYPE_RECEIVED,
    docType,
    permissions
  }),
  permissionsForDocumentForUserReceived: (
    docRef: DocRefType,
    user: User,
    permissions: Array<string>
  ): PermissionsForDocumentForUserReceivedAction => ({
    type: PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED,
    docRef,
    user,
    permissions
  }),
  permissionsForDocumentReceived: (
    docRef: DocRefType,
    documentPermissions: DocumentPermissions
  ): PermissionsForDocumentReceivedAction => ({
    type: PERMISSIONS_FOR_DOCUMENT_RECEIVED,
    docRef,
    documentPermissions
  }),
  documentPermissionAdded: (
    docRef: DocRefType,
    user: User,
    permissionName: string
  ): DocumentPermissionAddedAction => ({
    type: DOCUMENT_PERMISSION_ADDED,
    docRef,
    user,
    permissionName
  }),
  documentPermissionRemoved: (
    docRef: DocRefType,
    user: User,
    permissionName: string
  ): DocumentPermissionRemovedAction => ({
    type: DOCUMENT_PERMISSION_REMOVED,
    docRef,
    user,
    permissionName
  }),
  documentPermissionsCleared: (
    docRef: DocRefType
  ): DocumentPermissionsClearedAction => ({
    type: DOCUMENT_PERMISSIONS_CLEARED,
    docRef
  })
});

export const reducer = prepareReducer(defaultState)
  .handleAction<PermissionsForDocTypeReceivedAction>(
    PERMISSIONS_FOR_DOC_TYPE_RECEIVED,
    (state = defaultState, { docType, permissions }) => ({
      ...state,
      permissionsByDocType: {
        ...state.permissionsByDocType,
        [docType]: permissions
      }
    })
  )
  .handleAction<PermissionsForDocumentReceivedAction>(
    PERMISSIONS_FOR_DOCUMENT_RECEIVED,
    (state = defaultState, { docRef, documentPermissions }) => ({
      ...state,
      permissionsByDocUuidThenUserUuid: {
        ...state.permissionsByDocUuidThenUserUuid,
        [docRef.uuid]: {
          ...documentPermissions.byUser
        }
      }
    })
  )
  .handleAction<PermissionsForDocumentForUserReceivedAction>(
    PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED,
    (state = defaultState, { docRef, user, permissions }) => ({
      ...state,
      permissionsByDocUuid: {
        ...state.permissionsByDocUuidThenUserUuid,
        [docRef.uuid]: {
          [user.uuid]: permissions
        }
      },
      userIsGroup: {
        ...state.userIsGroup,
        [user.uuid]: user.isGroup
      }
    })
  )
  .handleAction<DocumentPermissionAddedAction>(
    DOCUMENT_PERMISSION_ADDED,
    (state = defaultState, { docRef, user, permissionName }) => ({
      ...state,

      permissionsByDocUuid: {
        ...state.permissionsByDocUuidThenUserUuid,
        [docRef.uuid]: {
          [user.uuid]: (!!state.permissionsByDocUuidThenUserUuid[docRef.uuid] &&
            state.permissionsByDocUuidThenUserUuid[docRef.uuid][user.uuid] &&
            state.permissionsByDocUuidThenUserUuid[docRef.uuid][
              user.uuid
            ].concat([permissionName])) || [permissionName]
        }
      },

      userIsGroup: {
        ...state.userIsGroup,
        [user.uuid]: user.isGroup
      }
    })
  )
  .handleAction<DocumentPermissionRemovedAction>(
    DOCUMENT_PERMISSION_REMOVED,
    (state = defaultState, { docRef, user, permissionName }) => ({
      ...state,

      permissionsByDocUuid: {
        ...state.permissionsByDocUuidThenUserUuid,
        [docRef.uuid]: {
          [user.uuid]:
            (!!state.permissionsByDocUuidThenUserUuid[docRef.uuid] &&
              !!state.permissionsByDocUuidThenUserUuid[docRef.uuid][
                user.uuid
              ] &&
              state.permissionsByDocUuidThenUserUuid[docRef.uuid][
                user.uuid
              ].filter(p => p !== permissionName)) ||
            []
        }
      },

      userIsGroup: {
        ...state.userIsGroup,
        [user.uuid]: user.isGroup
      }
    })
  )
  .handleAction<DocumentPermissionsClearedAction>(
    DOCUMENT_PERMISSIONS_CLEARED,
    (state = defaultState, { docRef }) => ({
      ...state,

      permissionsByDocUuid: {
        ...state.permissionsByDocUuidThenUserUuid,
        [docRef.uuid]: {}
      }
    })
  )

  .getReducer();
