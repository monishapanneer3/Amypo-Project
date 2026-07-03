package com.example.demo.service;

import com.example.demo.dto.SpeakerDTO;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Speaker;
import com.example.demo.repository.SpeakerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;

@Service
public class SpeakerService {

    private final SpeakerRepository speakerRepository;

    public SpeakerService(SpeakerRepository speakerRepository) {
        this.speakerRepository = speakerRepository;
    }

    private SpeakerDTO toDTO(Speaker s) {
        SpeakerDTO dto = new SpeakerDTO();
        dto.setId(s.getId());
        dto.setName(s.getName());
        dto.setEmail(s.getEmail());
        dto.setExpertise(s.getExpertise());
        dto.setBio(s.getBio());
        return dto;
    }

    private Speaker toEntity(SpeakerDTO dto) {
        Speaker s = new Speaker();
        s.setName(dto.getName());
        s.setEmail(dto.getEmail());
        s.setExpertise(dto.getExpertise());
        s.setBio(dto.getBio());
        return s;
    }

    public Page<SpeakerDTO> getAllSpeakers(Pageable pageable) {
        return speakerRepository.findAll(pageable).map(this::toDTO);
    }

    public Optional<SpeakerDTO> getSpeakerById(Long id) {
        return speakerRepository.findById(id).map(this::toDTO);
    }

    public SpeakerDTO createSpeaker(SpeakerDTO speakerDto) {
        if (speakerRepository.existsByEmail(speakerDto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        return toDTO(speakerRepository.save(toEntity(speakerDto)));
    }

    public SpeakerDTO updateSpeaker(Long id, SpeakerDTO updatedDto) {
        Speaker s = speakerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Speaker not found: " + id));
        s.setName(updatedDto.getName());
        s.setEmail(updatedDto.getEmail());
        s.setExpertise(updatedDto.getExpertise());
        s.setBio(updatedDto.getBio());
        return toDTO(speakerRepository.save(s));
    }

    public void deleteSpeaker(Long id) {
        if (!speakerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Speaker not found: " + id);
        }
        speakerRepository.deleteById(id);
    }
}
