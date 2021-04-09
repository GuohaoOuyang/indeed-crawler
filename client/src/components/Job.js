import React, { useState, useContext } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  TextField,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { updateJob, deleteJob } from "../context/Actions";
import CloseIcon from "@material-ui/icons/Close";
import { GlobalContext } from "../context/GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    width: "50%",
    height: "10em",
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.3)",
    },
  },
  content: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  company: {
    color: "#d2d2d2",
    fontWeight: 400,
    fontSize: 15,
  },
  customBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden",
  },
  rightBox: {
    alignSelf: "start",
    padding: theme.spacing(2),
    marginLeft: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  editInput: {
    "& > *": {
      justifySelf: "start",
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    cursor: "pointer",
    transition: "all 0.5s ease",
    justifySelf: "end",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
}));

const Job = ({ job }) => {
  const classes = useStyles();

  const { dispatch } = useContext(GlobalContext);

  const [title, setTitle] = useState("");

  const handlTitleEdit = async (title, id) => {
    try {
      updateJob(dispatch, id, { title: title });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      deleteJob(dispatch, id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Box component="div">
            <Typography variant="h6" gutterBottom>
              {job.title}
            </Typography>
          </Box>
          <Typography className={classes.company} gutterBottom>
            {job.company}
          </Typography>
          <Box component="div" classes={{ root: classes.customBox }}>
            <Typography gutterBottom>{job.location}</Typography>
          </Box>
        </CardContent>
        <Box component="div" className={classes.rightBox}>
          <IconButton aria-label="delete" onClick={() => handleDelete(job._id)}>
            <CloseIcon className={classes.icon} />
          </IconButton>

          <form className={classes.editInput} noValidate autoComplete="off">
            <TextField
              id={job._id}
              onChange={(e) => setTitle(e.target.value)}
              label="edit title"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handlTitleEdit(title, job._id);
                }
              }}
            />
          </form>
        </Box>
      </Card>
    </>
  );
};

export default Job;
