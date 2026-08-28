import api from "./api";

const RESOURCE = "/speakers";

const getAllSpeakers = (page = 0, size = 10) =>
  api.get(RESOURCE, { params: { page, size } });

const getSpeakerById = (id) => api.get(`${RESOURCE}/${id}`);

const createSpeaker = (speakerDto) => api.post(RESOURCE, speakerDto);

const updateSpeaker = (id, speakerDto) =>
  api.put(`${RESOURCE}/${id}`, speakerDto);

const deleteSpeaker = (id) => api.delete(`${RESOURCE}/${id}`);

const speakerService = {
  getAllSpeakers,
  getSpeakerById,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
};

export default speakerService;
