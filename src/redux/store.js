import {
    applyMiddleware,
    combineReducers,
    compose,
    legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/reducer";

const composerEnhancer =
    window.___REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
    auth: authReducer,
    // categories: categoriesReducer,
    // notif: notifReducer,
    // speakers: speakersReducer,
    // events: eventsReducer,
    // lists: listsReducer,
    // transactions: transactionsReducer,
});

const store = createStore(
    rootReducers,
    composerEnhancer(applyMiddleware(thunk))
);

export default store;
