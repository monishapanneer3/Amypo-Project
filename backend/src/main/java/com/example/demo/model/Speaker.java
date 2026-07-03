package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "speakers")
public class Speaker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Column(unique = true)
    private String email;

    private String expertise;
    private String bio;

    @OneToMany(mappedBy = "speaker", cascade = CascadeType.ALL)
    private List<SessionEntry> sessions;

    public Speaker() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getExpertise() { return expertise; }
    public void setExpertise(String expertise) { this.expertise = expertise; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public List<SessionEntry> getSessions() { return sessions; }
    public void setSessions(List<SessionEntry> sessions) { this.sessions = sessions; }
}
