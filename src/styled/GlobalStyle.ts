import { createGlobalStyle } from "styled-components";

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

// Style table headers
.ReactTable .rt-th {
  font-weight: bold;
  text-align: left;
}

.ReactTable .-header {
  // We don't need the line under the header
  border-bottom: none;
}

.ReactTable .rt-tr-group {
  // We don't need lines between the rows
  border-bottom: none;
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
