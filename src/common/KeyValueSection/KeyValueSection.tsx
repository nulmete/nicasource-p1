import React from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import renderValueIfExists from "../../utils/renderValueIfExists";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      fontWeight: "bold",
    },
    keyValueContainer: {
      display: "flex",
      alignItems: "center",
      "&:not(:last-child)": {
        marginBottom: theme.spacing(1),
      },
      "& > span": {
        display: "block",
      },
    },
    key: {
      marginRight: "4px",
    },
  })
);

type Content = {
  key: string;
  value?: string | number;
};

interface Props {
  header: string;
  content: Content[];
}

const KeyValueSection: React.FC<Props> = ({ header, content }) => {
  const classes = useStyles();

  const keyValuePairs = content.map((pair, index) => {
    const key = `${header}-${pair.key}-${index}`;

    return (
      <Typography
        variant="body1"
        className={classes.keyValueContainer}
        key={key}
      >
        <span className={classes.key}>{pair.key}:</span>
        <span>{renderValueIfExists(pair.value)}</span>
      </Typography>
    );
  });

  return (
    <div>
      <Typography
        className={classes.header}
        variant="h5"
        component="h2"
        gutterBottom
      >
        {header}
      </Typography>
      {keyValuePairs}
    </div>
  );
};

export default KeyValueSection;
