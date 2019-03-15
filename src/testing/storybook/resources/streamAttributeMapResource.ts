import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { TestCache } from "../PollyDecorator";
import { Config } from "../../../startup/config";
import { ResourceBuilder } from "./types";

const resourceBuilder: ResourceBuilder = (
  server: any,
  testConfig: Config,
  testCache: TestCache
) => {
  const resource = `${testConfig.stroomBaseServiceUrl}/streamattributemap/v1`;

  /**
   * The StreamAttributeMap resource supports expression-based search.
   * This responds with the datasource for this expression.
   */
  server
    .get(`${resource}/dataSource`)
    .intercept((req: HttpRequest, res: HttpResponse) =>
      res.json(testCache.data!.dataSource)
    );

  /**
   * This responds with a list of streamAttributeMaps
   */
  server
    .get(resource)
    .intercept((req: HttpRequest, res: HttpResponse) =>
      res.json(testCache.data!.dataList)
    );
};

export default resourceBuilder;