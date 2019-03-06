import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { TestCache } from "../PollyDecorator";
import { Config } from "../../../startup/config";
import { ResourceBuilder } from "./resourceBuilder";
import { onlyUnique } from "../../../lib/reduxUtils";

const resourceBuilder: ResourceBuilder = (
  server: any,
  testConfig: Config,
  testCache: TestCache
) => {
  // Get All App Permission Names
  server
    .get(`${testConfig.stroomBaseServiceUrl}/appPermissions/v1`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      res.json(testCache.data!.allAppPermissions);
    });
  server
    .get(`${testConfig.stroomBaseServiceUrl}/appPermissions/v1/:userUuid`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      res.json(testCache.data!.userAppPermissions[req.params.userUuid] || []);
    });
  server
    .post(
      `${
        testConfig.stroomBaseServiceUrl
      }/appPermissions/v1/:userUuid/:permission`
    )
    .intercept((req: HttpRequest, res: HttpResponse) => {
      testCache.data!.userAppPermissions[req.params.userUuid] = [
        ...(testCache.data!.userAppPermissions[req.params.userUuid] || []),
        req.params.permission
      ].filter(onlyUnique);

      res.send(undefined);
      // res.sendStatus(204);
    });

  server
    .delete(
      `${
        testConfig.stroomBaseServiceUrl
      }/appPermissions/v1/:userUuid/:permission`
    )
    .intercept((req: HttpRequest, res: HttpResponse) => {
      testCache.data!.userAppPermissions[
        req.params.userUuid
      ] = testCache.data!.userAppPermissions[req.params.userUuid].filter(
        p => p !== req.params.permission
      );

      res.send(undefined);
      // res.sendStatus(204);
    });
};

export default resourceBuilder;
