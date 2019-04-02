import * as React from "react";
import ErrorReportingContext from "./ErrorReportingContext";

const useErrorReporting = () => useContext(ErrorReportingContext);

export default useErrorReporting;
