import { combineReducers } from "redux";
import { reducer as reduxReducer } from "redux-form";

const rootReducer = combineReducers({
  form: reduxReducer
});

export default rootReducer;
