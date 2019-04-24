import { Config } from "startup/config";
import { TestCache } from "../PollyDecorator";

export type ResourceBuilder = (
  server: any,
  { stroomBaseServiceUrl }: Config,
  testCache: TestCache,
) => any;
