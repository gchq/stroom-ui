import { useReducer } from "react";
import { User } from "../types";

interface UserSearchStateApi {
  users: User[];
  setUsers: (users: User[]) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  selectedUser: string;
  setSelectedUser: (userId: string) => void;
}

interface UserSearchState {
  users: User[];
  totalPages: number;
  selectedUser: string;
}

interface SetUsersAction {
  type: "set_user";
  users: User[];
}

interface SetTotalPagesAction {
  type: "set_total_pages";
  totalPages: number;
}

interface ChangeSelectedUserAction {
  type: "change_selected_user";
  userId: string;
}

const reducer = (
  state: UserSearchState,
  action: SetUsersAction | SetTotalPagesAction | ChangeSelectedUserAction,
) => {
  switch (action.type) {
    case "set_user":
      return { ...state, users: action.users };
    case "change_selected_user":
      return { ...state, selectedUser: action.userId };
    case "set_total_pages":
      return { ...state, totalPages: action.totalPages };
    default:
      return state;
  }
};

const useUserSearchState = (): UserSearchStateApi => {
  const [userState, dispatch] = useReducer(reducer, {
    users: [],
    totalPages: 0,
    selectedUser: "",
  });
  return {
    users: userState.users,
    totalPages: userState.totalPages,
    selectedUser: userState.selectedUser,
    setUsers: (users: User[]) => dispatch({ type: "set_user", users }),
    setTotalPages: (totalPages: number) =>
      dispatch({ type: "set_total_pages", totalPages }),
    setSelectedUser: (userId: string) =>
      dispatch({ type: "change_selected_user", userId }),
  };
};

export { useUserSearchState };
