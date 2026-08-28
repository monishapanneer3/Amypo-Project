import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sessionService from "../../services/sessionService";

const initialState = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  page: 0,
  size: 10,
  loading: false,
  error: null,
  statusMessage: null,
};

export const fetchSessions = createAsyncThunk(
  "sessions/fetchSessions",
  async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await sessionService.getAllSessions(page, size);
      return response.data;
    } catch (err) {
      return rejectWithValue("Server Unreachable");
    }
  }
);

export const createSession = createAsyncThunk(
  "sessions/createSession",
  async (sessionDto, { rejectWithValue }) => {
    try {
      const response = await sessionService.createSession(sessionDto);
      return response.data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        "Failed to create session";
      return rejectWithValue(message);
    }
  }
);

export const updateSession = createAsyncThunk(
  "sessions/updateSession",
  async ({ id, sessionDto }, { rejectWithValue }) => {
    try {
      const response = await sessionService.updateSession(id, sessionDto);
      return response.data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        "Failed to update session";
      return rejectWithValue(message);
    }
  }
);

export const deleteSession = createAsyncThunk(
  "sessions/deleteSession",
  async (id, { rejectWithValue }) => {
    try {
      await sessionService.deleteSession(id);
      return id;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        "Failed to delete session";
      return rejectWithValue(message);
    }
  }
);

const sessionSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    setSessionPage: (state, action) => {
      state.page = action.payload;
    },
    clearSessionStatus: (state) => {
      state.statusMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload.content || [];
        state.totalElements = action.payload.totalElements || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.page = action.payload.number || 0;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Server Unreachable";
        state.content = [];
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.content.push(action.payload);
        state.statusMessage = "Session created successfully.";
      })
      .addCase(createSession.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        const idx = state.content.findIndex(
          (s) => s.id === action.payload.id
        );
        if (idx !== -1) state.content[idx] = action.payload;
        state.statusMessage = "Session updated successfully.";
      })
      .addCase(updateSession.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.content = state.content.filter((s) => s.id !== action.payload);
        state.statusMessage = "Session deleted successfully.";
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSessionPage, clearSessionStatus } = sessionSlice.actions;
export default sessionSlice.reducer;
