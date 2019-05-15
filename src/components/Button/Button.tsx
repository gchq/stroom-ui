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

import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { ButtonProps } from "./types";

// const ripple = (evt: React.MouseEvent<HTMLButtonElement>): void => {
//   alert("I was clicked");

//   const btn = evt.currentTarget;
//   var x = evt.pageX - btn.offsetLeft;
//   var y = evt.pageY - btn.offsetTop;

//   const rippleContainer = btn.getElementsByClassName("ripple-container")[0];

//   // btn.append("<span class=ripple/>").css({
//   //   left: x,
//   //   top: y,
//   // });

//   const span = document.createElement("span");
//   span.className = "ripple";
//   span.style.left = x + "px";
//   span.style.top = y + "px";
//   rippleContainer.append(span);

//   // DOM.span
//   //   .appendTo(btn)
//   //   .css({
//   //     left: x,
//   //     top: y,
//   //   });
// };

export const Button = ({
  text,
  icon,
  className: rawClassName,
  appearance,
  action,
  selected,
  disabled,
  size,
  onClick,
  ...rest
}: ButtonProps) => {
  const className = React.useMemo(() => {
    let classNames = ["button"];

    if (rawClassName) classNames.push(rawClassName);

    // Set the base button class.
    classNames.push("button-base");
    // Set the general button styling class unless this is an icon button.
    if (appearance !== "icon") classNames.push("button");

    // Get the style name.
    let appearanceName = "button-default";
    if (appearance) {
      switch (appearance) {
        case "default": {
          appearanceName = "button-default";
          break;
        }
        case "outline": {
          appearanceName = "button-outline";
          break;
        }
        case "icon": {
          appearanceName = "button-icon";
          break;
        }
        case "contained": {
          appearanceName = "button-contained";
          break;
        }
        default:
          break;
      }
    }
    // Set the style name.
    classNames.push(appearanceName);

    // Get the color (none by default);
    let actionName;
    if (action) {
      switch (action) {
        case "primary": {
          actionName = appearanceName + "-primary";
          break;
        }
        case "secondary": {
          actionName = appearanceName + "-secondary";
          break;
        }
        default:
          break;
      }
    }
    if (actionName) {
      // Set the color.
      classNames.push(actionName);
    }

    if (text) classNames.push("has-text");
    if (selected) classNames.push("button-selected");
    if (disabled) classNames.push("button-disabled");

    classNames.push(size);

    return classNames.join(" ");
  }, [rawClassName, appearance, action, text, selected, disabled, size]);

  let fontAwesomeSize: SizeProp = React.useMemo(() => {
    switch (size) {
      case "small":
        return "sm";
      case "medium":
        return "1x";
      case "large":
        return "lg";
      case "xlarge":
        return "2x";
      default:
        fontAwesomeSize = "1x";
    }
    return "lg";
  }, [size]);

  let showText = text && appearance !== "icon";

  const ripple = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    // alert("I was clicked");

    const btn = evt.currentTarget;
    const rect = btn.getBoundingClientRect();
    var x = evt.clientX - rect.left;
    var y = evt.clientY - rect.top;

    const rippleContainer = btn.getElementsByClassName("ripple-container")[0];

    // btn.append("<span class=ripple/>").css({
    //   left: x,
    //   top: y,
    // });

    const span = document.createElement("span");
    span.className = "ripple";
    span.style.left = x + "px";
    span.style.top = y + "px";
    rippleContainer.append(span);

    // DOM.span
    //   .appendTo(btn)
    //   .css({
    //     left: x,
    //     top: y,
    //   });
    if (onClick) {
      onClick(evt);
    }
  };

  return (
    <button className={className} onClick={ripple} {...rest}>
      <div className="ripple-container" />
      {icon ? (
        <FontAwesomeIcon size={fontAwesomeSize} icon={icon} />
      ) : (
        undefined
      )}
      {showText && icon ? <span className="button-margin" /> : undefined}
      {showText ? <span className="button-text">{text}</span> : undefined}
    </button>
  );
};

export default Button;
