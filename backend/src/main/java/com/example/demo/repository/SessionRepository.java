package com.example.demo.repository;

import com.example.demo.model.SessionEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<SessionEntry, Long> {
}
