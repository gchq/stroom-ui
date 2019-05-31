import * as React from "react";

import Processing from "./Processing";
import { addStory } from "testing/storybook/themedStoryGenerator";

addStory("Sections/Processing", "Processing", module, () => <Processing />);
