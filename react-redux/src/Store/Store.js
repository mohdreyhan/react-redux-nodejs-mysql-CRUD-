import { createStore } from "redux";
import reducer from '../reducer/Reducer.js';


const store = createStore(reducer);

export default store;
