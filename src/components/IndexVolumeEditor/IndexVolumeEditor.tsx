import * as React from "react";

import IconHeader from "../IconHeader";
import Button from "../Button";
import useHistory from "../../lib/useHistory";

export interface Props {
  id: number;
}

const IndexVolumeEditor = ({ id }: Props) => {
  const history = useHistory();

  return (
    <div>
      <IconHeader icon="database" text={`Index Volume ${id}`} />
      <Button
        text="Back"
        onClick={() => history.push(`/s/indexing/volumes/`)}
      />
    </div>
  );
};

export default IndexVolumeEditor;
