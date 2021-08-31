import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
    },
    button: {
      marginLeft: theme.spacing(2),
    },
  })
);

interface Props {
  inputLabel: string;
  inputPlaceholder: string;
  handleSearch: React.FormEventHandler<HTMLFormElement>;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Search: React.FC<Props> = ({
  inputLabel,
  inputPlaceholder,
  handleSearch,
  handleInputChange,
}) => {
  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={handleSearch}>
      <TextField
        label={inputLabel}
        placeholder={inputPlaceholder}
        variant="outlined"
        onChange={handleInputChange}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="submit"
      >
        Search
      </Button>
    </form>
  );
};

export default Search;
