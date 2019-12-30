/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

const styles = {
  fullScreen: {
    width: "100%",
    height: "100%",
  },
  center: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const themes = ["theme-light", "theme-dark"];

interface Props {
  theme: string;
  component: any;
  centerComponent?: React.ReactNode;
}

const ThemedContainer: React.FunctionComponent<Props> = ({
  theme,
  component,
  centerComponent,
}) => (
  <div className={`${theme} raised-low`} style={styles.fullScreen}>
    {centerComponent ? (
      <div className="page" style={styles.center}>
        {component()}
      </div>
    ) : (
      <React.Fragment>{component()}</React.Fragment>
    )}
  </div>
);

export const addThemedStories = (
  stories: any,
  component: any,
  centerComponent?: React.ReactNode,
) => {
  themes.forEach(theme =>
    stories.add(theme, () => (
      <ThemedContainer
        theme={theme}
        component={component}
        centerComponent={centerComponent}
      />
    )),
  );
};
