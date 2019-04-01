import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";
import { AnnotationsIndexDoc } from "src/types";

export const generate = (): AnnotationsIndexDoc => ({
  type: "AnnotationsIndex",
  uuid: uuidv4(),
  name: loremIpsum({ count: 2, units: "words" }),
});
