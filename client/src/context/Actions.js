import axios from "axios";

export const getJobs = async (dispatch, keyword) => {
  try {
    dispatch({
      type: "JOB_REQUEST",
    });
    const { data } = await axios.get("/api/jobs", {
      params: { keyword: keyword },
    });
    dispatch({
      type: "SET_JOBS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "SET_ERROR",
      payload: err.response.data.message,
    });
    throw err;
  }
};

export const setSearchTerm = async (dispatch, searchTerm) => {
  try {
    dispatch({
      type: "SET_SEARCH_TERM",
      payload: searchTerm,
    });
  } catch (err) {
    throw err;
  }
};

export const updateJob = async (dispatch, id, update) => {
  try {
    const { data } = await axios.patch(`/api/jobs/${id}`, update);
    console.log(data);
    dispatch({
      type: "SET_JOB",
      payload: data,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteJob = async (dispatch, id) => {
  try {
    dispatch({
      type: "DELETE_JOB",
      payload: id,
    });
  } catch (error) {
    throw error;
  }
};

export const addTags = async (dispatch, tag) => {
  try {
    await axios.patch("/api/jobs/addTag", tag);
    dispatch({
      type: "ADD_TAGS",
      payload: tag,
    });
  } catch (error) {
    throw error;
  }
};
