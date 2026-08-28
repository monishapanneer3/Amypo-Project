import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import sessionReducer from "./slices/sessionSlice";
import speakerReducer from "./slices/speakerSlice";
import attendeeReducer from "./slices/attendeeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sessions: sessionReducer,
    speakers: speakerReducer,
    attendees: attendeeReducer,
  },
});

export default store;
