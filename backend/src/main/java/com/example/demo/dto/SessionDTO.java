package com.example.demo.dto;

public class SessionDTO {
    private Long id;
    private String sessionName;
    private String topic;
    private String dayOfWeek;
    private String startTime;
    private String endTime;
    private String roomNote;
    private Long speakerId;
    private String speakerName;

    public SessionDTO() {}

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
    public Long getSpeakerId() { return speakerId; }
    public void setSpeakerId(Long speakerId) { this.speakerId = speakerId; }
    public String getSpeakerName() { return speakerName; }
    public void setSpeakerName(String speakerName) { this.speakerName = speakerName; }
}
