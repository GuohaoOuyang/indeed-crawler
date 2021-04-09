import React, { useContext, useEffect } from "react";
import SeachBox from "./SearchBox";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../context/GlobalState";
import { getJobs } from "../context/Actions";
import Job from "./Job";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Main = () => {
  const classes = useStyles();
  const { jobs, tags, dispatch, error, searchTerm } = useContext(GlobalContext);

  useEffect(() => {
    getJobs(dispatch, searchTerm);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <>
      <div className={classes.container}>
        <SeachBox />
        {!error && jobs ? (
          jobs.map((jobData) => <Job key={jobData._id} job={jobData} />)
        ) : (
          <div>No results found</div>
        )}
      </div>
    </>
  );
};

export default Main;
