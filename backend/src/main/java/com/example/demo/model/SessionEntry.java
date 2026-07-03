package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "sessions")
public class SessionEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String sessionName;

    private String topic;
    private String dayOfWeek;
    private String startTime;
    private String endTime;
    private String roomNote;

    @ManyToOne
    @JoinColumn(name = "speaker_id")
    private Speaker speaker;

    public SessionEntry() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSessionName() { return sessionName; }
    public void setSessionName(String sessionName) { this.sessionName = sessionName; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
    public String getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }
    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }
    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }
    public String getRoomNote() { return roomNote; }
    public void setRoomNote(String roomNote) { this.roomNote = roomNote; }
    public Speaker getSpeaker() { return speaker; }
    public void setSpeaker(Speaker speaker) { this.speaker = speaker; }
}
