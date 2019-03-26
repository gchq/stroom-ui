import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { TestCache } from "../PollyDecorator";
import { Config } from "../../../startup/config";
import { ResourceBuilder } from "./types";
import { PipelineModelType } from "src/types";

const resourceBuilder: ResourceBuilder = (
  server: any,
  { stroomBaseServiceUrl }: Config,
  testCache: TestCache
) => {
  const resource = `${stroomBaseServiceUrl}/pipelines/v1`;

  server
    .get(`${resource}/:pipelineId`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      const pipelineId = req.params.pipelineId;
      const pipeline = testCache.data!.pipelines.find(
        (p: PipelineModelType) => p.docRef.uuid === pipelineId
      );
      if (pipeline) {
        res.json(pipeline);
      } else {
        res.sendStatus(404);
      }
    });
  server.get(resource).intercept((req: HttpRequest, res: HttpResponse) => {
    res.json({
      total: testCache.data!.pipelines.length,
      pipelines: testCache.data!.pipelines.map(p => p.docRef)
    });
  });
  server
    .post(`${resource}/:pipelineId`)
    .intercept((req: HttpRequest, res: HttpResponse) => res.sendStatus(200));
};

export default resourceBuilder;
