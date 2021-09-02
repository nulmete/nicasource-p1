import { Typography } from "@material-ui/core";
import React from "react";

interface Props {
  hasGutterBottom?: boolean;
}

const TypographyBody: React.FC<Props> = ({
  children,
  hasGutterBottom = false,
}) => {
  return (
    <Typography variant="h5" component="h2" gutterBottom={hasGutterBottom}>
      {children}
    </Typography>
  );
};

export default TypographyBody;
