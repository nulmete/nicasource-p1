import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";

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
  handleSearch: (searchValue: string) => void;
}

const Search: React.FC<Props> = ({
  inputLabel,
  inputPlaceholder,
  handleSearch,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(value);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label={inputLabel}
        placeholder={inputPlaceholder}
        variant="outlined"
        onChange={(e) => {
          setValue(e.target.value);
        }}
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
