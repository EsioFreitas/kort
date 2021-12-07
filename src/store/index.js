import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./slices/card";
import userReducer from "./slices/user";
import dateReducer from "./slices/date";
import wipReducer from "./slices/wip";

export default configureStore({
  reducer: {
    card: cardReducer,
    user: userReducer,
    date: dateReducer,
    wip: wipReducer,
  },
});
