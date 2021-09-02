import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { HOME } from "../../constants/routes";

const GoBackHome: React.FC = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      component={RouterLink}
      to={HOME}
    >
      Go back home
    </Button>
  );
};

export default GoBackHome;
