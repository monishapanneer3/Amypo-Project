package com.example.demo.repository;

import com.example.demo.model.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {
    boolean existsByEmail(String email);
}
