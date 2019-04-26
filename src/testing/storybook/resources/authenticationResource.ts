import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { Config } from "startup/config/types";
import { ResourceBuilder } from "./types";

const resourceBuilder: ResourceBuilder = (
  server: any,
  { authenticationServiceUrl }: Config,
) => {
  server
    .get(`${authenticationServiceUrl}/idToken`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      const accessCode = req.params.accessCode;
      console.log("Trying access code", accessCode);

      res.sendStatus(200);
    });
};

export default resourceBuilder;
