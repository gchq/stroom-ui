import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { TestCache } from "../../PollyDecorator";
import { Config } from "../../../../startup/config";
import { ResourceBuilder } from "../types";

const resourceBuilder: ResourceBuilder = (
  server: any,
  { stroomBaseServiceUrl }: Config,
  testCache: TestCache
) => {
  const resource = `${stroomBaseServiceUrl}/xslt/v1/`;
  server
    .get(`${resource}/:xsltUuid`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      const xslt = testCache.data!.xslt.find(
        xslt => xslt.uuid === req.params.xsltUuid
      );
      if (xslt) {
        res.setHeader("Content-Type", "application/xml");
        res.send(xslt);
      } else {
        res.sendStatus(404);
      }
    });
  server
    .post(`${resource}/:xsltUuid`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      testCache.data!.xslt[req.params.xsltUuid].data = req.body;
      res.sendStatus(200);
    });
};

export default resourceBuilder;
