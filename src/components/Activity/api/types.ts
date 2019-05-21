export interface Activity {
  id?: string;
  version?: number;
  createTimeMs?: number;
  createUser?: string;
  updateTimeMs?: number;
  updateUser?: string;
  userId?: string;
  properties: Prop[];
}

export interface Prop {
  id: string;
  name: string;
  value: string;
  showInSelection: boolean;
  showInList: boolean;
}

export interface ActivityConfig {
  enabled: boolean;
  chooseOnStartup: boolean;
  managerTitle: string;
  editorTitle: string;
  editorBody: string;
}
