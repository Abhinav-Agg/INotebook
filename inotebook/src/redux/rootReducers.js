// rootReducer.js
// here we add multiple slice reducers and we export one reducer so that we add that reducer in the store.
import { combineReducers } from 'redux';
import getNotesReducer from "./slice/GetNotesSlice";
import addNoteReducer from "./slice/AddNewNoteSlice";
import DeleteNotesReducer from './slice/DeleteNotes';
import editNoteReducer from './slice/UpdateNoteSlice';

const rootReducer = combineReducers({
    // Syntax -> name of reducer which we given at time of cretae reducer : import Reducer from file which we export wtih the reducer method.
    getNotes: getNotesReducer,
    addNewNote: addNoteReducer,
    deleteNotes : DeleteNotesReducer,
    editNote : editNoteReducer
});

export default rootReducer;
