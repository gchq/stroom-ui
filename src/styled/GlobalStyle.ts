import { createGlobalStyle } from "./styled-components";

export default createGlobalStyle`
body {
  font-family: "Varela";
  margin: 0;
  padding: 0;
  height: 100%;
}

.fill-space {
  height: 100%;
  width: 100%;
}

:focus {
  background-color: ${({ theme }) => theme.raisedHigh_selectedBackgroundColor}
}

/* apply a natural box layout model to all elements, but allowing components to change */
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

input[type="text"],
select {
  width: 100%;
  padding: 0.6rem;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
}

`;
