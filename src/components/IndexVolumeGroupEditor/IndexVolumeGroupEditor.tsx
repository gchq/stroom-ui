import * as React from "react";

import IconHeader from "../IconHeader";
import Button from "../Button";
import useHistory from "../../lib/useHistory";

export interface Props {
  name: string;
}

const IndexVolumeGroupEditor = ({ name }: Props) => {
  const history = useHistory();

  return (
    <div>
      <IconHeader icon="database" text={name} />
      <Button text="Back" onClick={() => history.push(`/s/indexing/groups/`)} />
    </div>
  );
};

export default IndexVolumeGroupEditor;
