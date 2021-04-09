import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import { setSearchTerm } from "../context/Actions";
import { GlobalContext } from "../context/GlobalState";

const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};

const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius * 4,
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: "50%",
    border: "1px solid black",
  },
  input: {
    "&::placeholder": {
      fontWeight: "450",
      opacity: "0.2",
    },
  },
  inputBase: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5, 1, 0.5, 0),
    flex: 1,
  },
}));

const SearchBox = () => {
  const classes = useStyles();

  const { dispatch } = useContext(GlobalContext);

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="Search"
        classes={{ input: classes.input }}
        className={classes.inputBase}
        inputProps={{ "aria-label": "Company name" }}
        onChange={debounce(
          (e) => setSearchTerm(dispatch, e.target.value),
          1000
        )} // wait 1 sec after typing to set
      />
    </div>
  );
};

export default SearchBox;
