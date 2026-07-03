package com.example.demo.service;

import com.example.demo.dto.SessionDTO;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.SessionEntry;
import com.example.demo.model.Speaker;
import com.example.demo.repository.SessionRepository;
import com.example.demo.repository.SpeakerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final SpeakerRepository speakerRepository;

    public SessionService(SessionRepository sessionRepository, SpeakerRepository speakerRepository) {
        this.sessionRepository = sessionRepository;
        this.speakerRepository = speakerRepository;
    }

    private SessionDTO toDTO(SessionEntry s) {
        SessionDTO dto = new SessionDTO();
        dto.setId(s.getId());
        dto.setSessionName(s.getSessionName());
        dto.setTopic(s.getTopic());
        dto.setDayOfWeek(s.getDayOfWeek());
        dto.setStartTime(s.getStartTime());
        dto.setEndTime(s.getEndTime());
        dto.setRoomNote(s.getRoomNote());
        if (s.getSpeaker() != null) {
            dto.setSpeakerId(s.getSpeaker().getId());
            dto.setSpeakerName(s.getSpeaker().getName());
        }
        return dto;
    }

    public Page<SessionDTO> getAllSessions(Pageable pageable) {
        return sessionRepository.findAll(pageable).map(this::toDTO);
    }

    public Optional<SessionDTO> getSessionById(Long id) {
        return sessionRepository.findById(id).map(this::toDTO);
    }

    public SessionDTO createSession(SessionDTO sessionDto) {
        SessionEntry s = new SessionEntry();
        s.setSessionName(sessionDto.getSessionName());
        s.setTopic(sessionDto.getTopic());
        s.setDayOfWeek(sessionDto.getDayOfWeek());
        s.setStartTime(sessionDto.getStartTime());
        s.setEndTime(sessionDto.getEndTime());
        s.setRoomNote(sessionDto.getRoomNote());
        if (sessionDto.getSpeakerId() != null) {
            Speaker speaker = speakerRepository.findById(sessionDto.getSpeakerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Speaker not found: " + sessionDto.getSpeakerId()));
            s.setSpeaker(speaker);
        }
        return toDTO(sessionRepository.save(s));
    }

    public SessionDTO updateSession(Long id, SessionDTO updatedDto) {
        SessionEntry s = sessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found: " + id));
        s.setSessionName(updatedDto.getSessionName());
        s.setTopic(updatedDto.getTopic());
        s.setDayOfWeek(updatedDto.getDayOfWeek());
        s.setStartTime(updatedDto.getStartTime());
        s.setEndTime(updatedDto.getEndTime());
        s.setRoomNote(updatedDto.getRoomNote());
        if (updatedDto.getSpeakerId() != null) {
            Speaker speaker = speakerRepository.findById(updatedDto.getSpeakerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Speaker not found: " + updatedDto.getSpeakerId()));
            s.setSpeaker(speaker);
        }
        return toDTO(sessionRepository.save(s));
    }

    public void deleteSession(Long id) {
        if (!sessionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Session not found: " + id);
        }
        sessionRepository.deleteById(id);
    }
}
