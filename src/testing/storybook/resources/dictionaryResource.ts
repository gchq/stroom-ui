import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { TestCache } from "../PollyDecorator";
import { Config } from "../../../startup/config";
import { ResourceBuilder } from "./types";

const resourceBuilder: ResourceBuilder = (
  server: any,
  testConfig: Config,
  testCache: TestCache
) => {
  const resource = `${testConfig.stroomBaseServiceUrl}/dictionary/v1`;

  server
    .get(`${resource}/:dictionaryUuid`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      const dict = testCache.data!.dictionaries[req.params.dictionaryUuid];
      if (dict) {
        res.json(dict);
      } else {
        res.sendStatus(404);
      }
    });
  server
    .post(`${resource}/:dictionaryUuid`)
    .intercept((req: HttpRequest, res: HttpResponse) => res.sendStatus(200));
};

export default resourceBuilder;
