import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { TestCache } from "../PollyDecorator";
import { Config } from "../../../startup/config";
import { ResourceBuilder } from "./types";

const resourceBuilder: ResourceBuilder = (
  server: any,
  testConfig: Config,
  testCache: TestCache
) => {
  const resource = `${testConfig.stroomBaseServiceUrl}/pipelines/v1`;

  server
    .get(`${resource}/:pipelineId`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      const pipeline = testCache.data!.pipelines[req.params.pipelineId];
      if (pipeline) {
        res.json(pipeline);
      } else {
        res.sendStatus(404);
      }
    });
  server.get(resource).intercept((req: HttpRequest, res: HttpResponse) => {
    res.json({
      total: Object.keys(testCache.data!.pipelines).length,
      pipelines: Object.keys(testCache.data!.pipelines).map(p => ({
        uuid: p,
        name: p,
        type: "Pipeline"
      }))
    });
  });
  server
    .post(`${resource}/:pipelineId`)
    .intercept((req: HttpRequest, res: HttpResponse) => res.sendStatus(200));
};

export default resourceBuilder;
