import * as uuidv4 from "uuid/v4";
import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { TestCache } from "../PollyDecorator";
import { Config } from "src/startup/config";
import { ResourceBuilder } from "./types";

const resourceBuilder: ResourceBuilder = (
  server: any,
  { userServiceUrl }: Config,
  testCache: TestCache,
) => {
  const resource = userServiceUrl;

  // Get all users
  server.get(resource).intercept((req: HttpRequest, res: HttpResponse) => {
    res.json(testCache.data!.users);
  });
};

export default resourceBuilder;
