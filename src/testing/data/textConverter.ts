import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";
import { TextConverterDoc } from "src/types";

export const generate = (): TextConverterDoc => ({
  type: "TextConverter",
  uuid: uuidv4(),
  name: loremIpsum({ count: 2, units: "words" }),
});
