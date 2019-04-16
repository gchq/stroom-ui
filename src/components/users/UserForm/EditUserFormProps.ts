import { User } from "..";
import CreateUserFormProps from "./CreateUserFormProps";

export default interface EditUserFormProps extends CreateUserFormProps {
  user: User;
};
