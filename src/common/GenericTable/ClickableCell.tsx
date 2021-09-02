import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      background: "none",
      border: "none",
      padding: "0",
      font: "inherit",
      cursor: "pointer",
    },
  })
);

interface ClickableCellProps {
  valueToShow: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ClickableCell: React.FC<ClickableCellProps> = ({
  valueToShow,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <button type="button" onClick={onClick} className={classes.button}>
      {valueToShow}
    </button>
  );
};

export default ClickableCell;
