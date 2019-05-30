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
import { RenderFunction } from "@storybook/react";
import { themeOptions, useTheme, ThemeOption } from "lib/useTheme/useTheme";
import { storiesOf } from "@storybook/react";
import Toggle from "react-toggle";

const styles = {
  outer: {
    display: "flex",
    width: "100%",
    height: "100%",
    minWidth: "100%",
    minHeight: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    flexDirection: "column" as "column",
  },
  top: {
    position: "relative" as "relative",
    // width: "100%",
    // background: "#333333 linear-gradient(to top,transparent calc(100% - 1px),rgba(255,255,255,.1) calc(100% - 1px)",
    // position: "absolute" as "absolute",
    flexGrow: 1,
    flexShrink: 0,
    overflow: "auto",
    // bottom: 0,
  },
  bottom: {
    position: "relative" as "relative",
    // width: "100%",
    background:
      "#333333 linear-gradient(to top,transparent calc(100% - 1px),rgba(255,255,255,.1) calc(100% - 1px)",
    // position: "absolute" as "absolute",
    // flexGrow: 0,
    // flexShrink: 0,
    display: "flex",
    // bottom: 0,
    padding: "0.2rem",
    flexDirection: "row-reverse" as "row-reverse",
  },
  center: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  themeChooser: {
    display: "flex",
    width: "400px",
  },
};

// const themes = ["theme-light", "theme-dark"];

interface Props {
  component: RenderFunction;
  centerComponent?: React.ReactNode;
}

const ThemedContainer: React.FunctionComponent<Props> = ({
  component,
  centerComponent,
}) => {
  const { theme, setTheme } = useTheme();

  const value: ThemeOption = React.useMemo(
    () => themeOptions.find(t => t.value === theme) || themeOptions[0],
    [theme],
  );
  const onChange = React.useCallback(
    (d: ThemeOption) => {
      setTheme(d.value);
    },
    [setTheme],
  );

  return (
    <div className={`${theme}`} style={styles.outer}>
      <div style={styles.top}>
        <div className="page">
          {centerComponent ? (
            <div style={styles.center}>{component()}</div>
          ) : (
            <React.Fragment>{component()}</React.Fragment>
          )}
        </div>
      </div>
      <div style={styles.bottom}>
        <Toggle
          icons={false}
          checked={value === themeOptions[1]}
          onChange={event =>
            onChange(event.target.checked ? themeOptions[1] : themeOptions[0])
          }
        />
      </div>
    </div>
  );
};

export const addStory = (
  folder: string,
  story: string,
  module: NodeModule,
  component: RenderFunction,
  centerComponent?: React.ReactNode,
) => {
  const stories = storiesOf(folder, module);

  stories.add(story, () => (
    <ThemedContainer component={component} centerComponent={centerComponent} />
  ));
};
