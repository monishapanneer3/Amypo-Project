package com.example.demo.service;

import com.example.demo.dto.AttendeeDTO;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Attendee;
import com.example.demo.model.User;
import com.example.demo.repository.AttendeeRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;

@Service
public class AttendeeService {

    private final AttendeeRepository attendeeRepository;
    private final UserRepository userRepository;

    public AttendeeService(AttendeeRepository attendeeRepository, UserRepository userRepository) {
        this.attendeeRepository = attendeeRepository;
        this.userRepository = userRepository;
    }

    private AttendeeDTO toDTO(Attendee a) {
        AttendeeDTO dto = new AttendeeDTO();
        dto.setId(a.getId());
        dto.setFullName(a.getFullName());
        dto.setEmail(a.getEmail());
        dto.setRegistrationType(a.getRegistrationType());
        if (a.getUser() != null) {
            dto.setUserId(a.getUser().getId());
            dto.setUserName(a.getUser().getUsername());
        }
        return dto;
    }

    public Page<AttendeeDTO> getAllAttendees(Pageable pageable) {
        return attendeeRepository.findAll(pageable).map(this::toDTO);
    }

    public Optional<AttendeeDTO> getAttendeeById(Long id) {
        return attendeeRepository.findById(id).map(this::toDTO);
    }

    public AttendeeDTO createAttendee(AttendeeDTO attendeeDto) {
        if (attendeeRepository.existsByEmail(attendeeDto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        Attendee a = new Attendee();
        a.setFullName(attendeeDto.getFullName());
        a.setEmail(attendeeDto.getEmail());
        a.setRegistrationType(attendeeDto.getRegistrationType());
        if (attendeeDto.getUserId() != null) {
            User user = userRepository.findById(attendeeDto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found: " + attendeeDto.getUserId()));
            a.setUser(user);
        }
        return toDTO(attendeeRepository.save(a));
    }

    public AttendeeDTO updateAttendee(Long id, AttendeeDTO updatedDto) {
        Attendee a = attendeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendee not found: " + id));
        a.setFullName(updatedDto.getFullName());
        a.setEmail(updatedDto.getEmail());
        a.setRegistrationType(updatedDto.getRegistrationType());
        return toDTO(attendeeRepository.save(a));
    }

    public void deleteAttendee(Long id) {
        if (!attendeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Attendee not found: " + id);
        }
        attendeeRepository.deleteById(id);
    }
}
