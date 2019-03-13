import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { TestCache } from "../PollyDecorator";
import { Config } from "../../../startup/config";
import { ResourceBuilder } from "./types";

const resourceBuilder: ResourceBuilder = (
  server: any,
  testConfig: Config,
  testCache: TestCache
) => {
  const resource = `${testConfig.stroomBaseServiceUrl}/index/v1`;
  server
    .get(`${resource}/:indexUuid`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      const index = testCache.data!.indexes.find(
        index => index.uuid === req.params.indexUuid
      );
      if (index) {
        res.json(index);
      } else {
        res.sendStatus(404);
      }
    });
  server
    .post(`${resource}/:indexUuid`)
    .intercept((req: HttpRequest, res: HttpResponse) => res.sendStatus(200));
};

export default resourceBuilder;
