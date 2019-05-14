// import { string } from "yup";

export interface Activity {
  userId: string;
  details: ActivityDetails;
}

export interface ActivityDetails {
  properties: Prop[];
}

export interface Prop {
  id: string;
  name: string;
  value: string;
  showInSelection: boolean;
  showInList: boolean;
}
