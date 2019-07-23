import * as React from "react";
import styled from "styled-components";

/**
 * This is a simple minimal input with no functionality, just styling.
 *
 * The purpose is to provide what looks like edit-in-place, except it's
 * always an input and never anything else.
 *
 * It uses borders to achieve this:
 *  - No border and it just looks like test on the page
 *  - Hover shows a thin border and acts as an invitation to click
 *  - Focus shows a significant border and it looks like a normal input
 */
const MinimalInput = ({ ...rest }) => {
  const Input = styled.input`
    border: 0.063em solid white;
    padding: 0.2em 0.5em 0.2em 0.5em;

    :hover {
      border: 0.063em solid lightgrey;
    }

    :focus {
      border: 0.125em solid #2185d0;
      margin: -0.063em;
    }
  `;

  return <Input {...rest} />;
};

export default MinimalInput;
