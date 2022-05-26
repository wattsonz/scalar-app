import { Context, MakeStore, createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";
import reducer from "./reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';

//NOTE : Config Store
// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }

// const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//create a make store function that will
const makeStore: MakeStore<any> = (context: Context) => createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

//export an assembled wrapper
export const wrapper = createWrapper<any>(makeStore, { debug: true });