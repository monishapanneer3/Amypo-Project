import api from "./api";

const RESOURCE = "/attendees";

const getAllAttendees = (page = 0, size = 10) =>
  api.get(RESOURCE, { params: { page, size } });

const getAttendeeById = (id) => api.get(`${RESOURCE}/${id}`);

const createAttendee = (attendeeDto) => api.post(RESOURCE, attendeeDto);

const updateAttendee = (id, attendeeDto) =>
  api.put(`${RESOURCE}/${id}`, attendeeDto);

const deleteAttendee = (id) => api.delete(`${RESOURCE}/${id}`);

const attendeeService = {
  getAllAttendees,
  getAttendeeById,
  createAttendee,
  updateAttendee,
  deleteAttendee,
};

export default attendeeService;
