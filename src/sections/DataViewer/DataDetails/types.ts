export interface StroomData {
  markers: ErrorData[];
  data: string;
}

export interface ErrorData {
  elementId: string;
  location: Location;
  message: string;
  severity: string;
}

export interface Location {
  streamNo: number;
  lineNo: number;
  colNo: number;
}
