import { combineReducers } from "redux";
import {reducer as formReducer} from "redux-form";
import general from "./general";


export default combineReducers({form:formReducer,general});
