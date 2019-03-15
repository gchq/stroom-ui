import * as React from "react";

export interface Props {
  value: any;
}

export default ({ value }: Props) => (
  <div
    style={{
      margin: "3rem 0",
      borderRadius: 4,
      background: "#f6f8fa",

      boxShadow: "0 0 1px  #eee inset"
    }}
  >
    <div
      style={{
        textTransform: "uppercase",
        fontSize: 11,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        fontWeight: 500,
        padding: ".5rem",
        background: "#555",
        color: "#fff",
        letterSpacing: "1px"
      }}
    >
      Form State
    </div>
    <pre
      style={{
        fontSize: ".65rem",
        padding: ".25rem .5rem",
        overflowX: "scroll"
      }}
    >
      {JSON.stringify(value, null, 2)}
    </pre>
  </div>
);