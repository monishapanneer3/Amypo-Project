import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import attendeeService from "../../services/attendeeService";

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

export const fetchAttendees = createAsyncThunk(
  "attendees/fetchAttendees",
  async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await attendeeService.getAllAttendees(page, size);
      return response.data;
    } catch (err) {
      return rejectWithValue("Server Unreachable");
    }
  }
);

export const createAttendee = createAsyncThunk(
  "attendees/createAttendee",
  async (attendeeDto, { rejectWithValue }) => {
    try {
      const response = await attendeeService.createAttendee(attendeeDto);
      return response.data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        "Failed to register attendee";
      return rejectWithValue(message);
    }
  }
);

export const updateAttendee = createAsyncThunk(
  "attendees/updateAttendee",
  async ({ id, attendeeDto }, { rejectWithValue }) => {
    try {
      const response = await attendeeService.updateAttendee(id, attendeeDto);
      return response.data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        "Failed to update attendee";
      return rejectWithValue(message);
    }
  }
);

export const deleteAttendee = createAsyncThunk(
  "attendees/deleteAttendee",
  async (id, { rejectWithValue }) => {
    try {
      await attendeeService.deleteAttendee(id);
      return id;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        "Failed to delete attendee";
      return rejectWithValue(message);
    }
  }
);

const attendeeSlice = createSlice({
  name: "attendees",
  initialState,
  reducers: {
    setAttendeePage: (state, action) => {
      state.page = action.payload;
    },
    clearAttendeeStatus: (state) => {
      state.statusMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendees.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload.content || [];
        state.totalElements = action.payload.totalElements || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.page = action.payload.number || 0;
      })
      .addCase(fetchAttendees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Server Unreachable";
        state.content = [];
      })
      .addCase(createAttendee.fulfilled, (state, action) => {
        state.content.push(action.payload);
        state.statusMessage = "Registration Successful";
      })
      .addCase(createAttendee.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateAttendee.fulfilled, (state, action) => {
        const idx = state.content.findIndex(
          (a) => a.id === action.payload.id
        );
        if (idx !== -1) state.content[idx] = action.payload;
        state.statusMessage = "Item updated via PUT";
      })
      .addCase(updateAttendee.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteAttendee.fulfilled, (state, action) => {
        state.content = state.content.filter((a) => a.id !== action.payload);
        state.statusMessage = "Attendee deleted successfully";
      })
      .addCase(deleteAttendee.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setAttendeePage, clearAttendeeStatus } = attendeeSlice.actions;
export default attendeeSlice.reducer;
