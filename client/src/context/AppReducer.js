const reducer = (state, action) => {
  switch (action.type) {
    case "JOB_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SET_JOBS":
      return {
        ...state,
        jobs: action.payload.jobs,
        loading: false,
        error: null,
      };
    case "SET_JOB":
      return {
        jobs: [
          ...state.jobs.filter(
            (job) => job._id !== action.payload,
            action.payload
          ),
        ],
      };
    case "ADD-TAGS":
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };
    case "DELETE_JOB":
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
