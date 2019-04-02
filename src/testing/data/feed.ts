import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";
import { FeedDoc } from "src/types";

export const generate = (): FeedDoc => ({
  type: "Feed",
  uuid: uuidv4(),
  name: loremIpsum({ count: 2, units: "words" }),
});
