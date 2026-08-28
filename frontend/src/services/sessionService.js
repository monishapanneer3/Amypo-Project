import api from "./api";

const RESOURCE = "/sessions";

const getAllSessions = (page = 0, size = 10) =>
  api.get(RESOURCE, { params: { page, size } });

const getSessionById = (id) => api.get(`${RESOURCE}/${id}`);

const createSession = (sessionDto) => api.post(RESOURCE, sessionDto);

const updateSession = (id, sessionDto) =>
  api.put(`${RESOURCE}/${id}`, sessionDto);

const deleteSession = (id) => api.delete(`${RESOURCE}/${id}`);

const sessionService = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
};

export default sessionService;
