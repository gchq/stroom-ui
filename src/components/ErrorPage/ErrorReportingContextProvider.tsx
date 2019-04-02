import * as React from "react";
import { FunctionComponent, useState } from "react";

import { SingleError } from "./types";
import ErrorReportingContext from "./ErrorReportingContext";

const ErrorReportingContextProvider: FunctionComponent = ({ children }) => {
  const [error, reportError] = useState<SingleError | undefined>(undefined);

  return (
    <ErrorReportingContext.Provider value={{ error, reportError }}>
      {children}
    </ErrorReportingContext.Provider>
  );
};

export default ErrorReportingContextProvider;
