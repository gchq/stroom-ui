import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";
import { TextConverterDoc } from "components/DocumentEditors/useDocumentApi/types/textConverter";

export const generate = (): TextConverterDoc => ({
  type: "TextConverter",
  uuid: uuidv4(),
  name: loremIpsum({ count: 2, units: "words" }),
});
