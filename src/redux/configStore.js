import { createStore, applyMiddleware } from "redux";
//MIDDLEWARE SAGA
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";

import rootSaga from "./sagas/rootSaga";
import rootReducer from "./reducers/rootReducer";

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

// Gọi saga
sagaMiddleWare.run(rootSaga);
export default store;
