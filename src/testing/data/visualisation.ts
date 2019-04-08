import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";
import { VisualisationDoc } from "src/api/useDocumentApi/types/visualisation";

export const generate = (): VisualisationDoc => ({
  type: "Visualisation",
  uuid: uuidv4(),
  name: loremIpsum({ count: 2, units: "words" }),
});
