import { CircularProgress } from "@material-ui/core";
import React from "react";

interface Props {
  size?: number | string;
}

const Spinner: React.FC<Props> = ({ size }) => {
  return <CircularProgress size={size} />;
};

export default Spinner;
