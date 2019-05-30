import * as React from "react";

import { addStory } from "testing/storybook/themedStoryGenerator";
import Step4, { Car } from "./Step4";

const CARS: Car[] = [
  {
    model: "Yaris",
    manufacturer: "Toyota",
  },
  {
    model: "Focus",
    manufacturer: "Ford",
  },
  {
    model: "Model-T",
    manufacturer: "Tesla",
  },
];

addStory("New Developer", "Step 4", module, () => (
  <Step4 cars={CARS} loadCars={() => console.log("Loading Cars")} />
));
