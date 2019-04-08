import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";

import bitmapReference from "./bitmap-reference";
import { XsltDoc } from "src/api/useDocumentApi/types/xsltDoc";

export const generate = (): XsltDoc => ({
  type: "XSLT",
  uuid: uuidv4(),
  name: loremIpsum({ count: 2, units: "words" }),
  description: loremIpsum({ count: 6, units: "words" }),
  data: bitmapReference,
});

export default generate;
