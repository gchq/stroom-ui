export interface StoreState {
  changePasswordErrorMessage: any;
  errorStatus?: string;
  errorText?: string;
  password: string;
}

export interface User {
  comments: string;
  createdByUser?: any;
  createdOn?: any;
  email: string;
  firstName: string;
  forcePasswordChange: boolean;
  id?: string;
  lastLogin?: any;
  lastName: string;
  loginCount?: number;
  neverExpires?: boolean;
  state: string;
  updatedByUser?: any;
  updatedOn?: any;
}
