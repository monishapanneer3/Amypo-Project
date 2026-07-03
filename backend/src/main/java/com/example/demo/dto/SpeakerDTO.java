package com.example.demo.dto;

public class SpeakerDTO {
    private Long id;
    private String name;
    private String email;
    private String expertise;
    private String bio;

    public SpeakerDTO() {}

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
}
