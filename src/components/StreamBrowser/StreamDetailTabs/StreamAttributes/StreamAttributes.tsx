import * as React from "react";
import { StreamMetaRow } from "components/StreamBrowser/types";

interface Props {
  dataRow: StreamMetaRow;
}

const defaultAttributes = {
  none: "none",
};

const StreamAttributes: React.FunctionComponent<Props> = ({ dataRow }) => (
  <div className="tab-pane">
    <div className="StreamDetails__container">
      <div className="StreamDetails__table__container">
        <table className="StreamDetails__table">
          <tbody>
            {Object.entries(dataRow.attributes || defaultAttributes)
              .map(k => ({ key: k[0], value: k[1] }))
              .map(({ key, value }) => {
                if (key !== "Until" && key !== "Rule" && key !== "Age") {
                  return (
                    <tr>
                      <td>{key}</td>
                      <td>
                        <code>{value}</code>
                      </td>
                    </tr>
                  );
                }
                return undefined;
              })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default StreamAttributes;
