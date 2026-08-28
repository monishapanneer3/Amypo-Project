import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Input, Button, message } from "antd";
import {
  createSpeaker,
  updateSpeaker,
} from "../../store/slices/speakerSlice";

const { TextArea } = Input;

const emptyForm = { name: "", email: "", expertise: "", bio: "" };

const SpeakerForm = ({ open, initialValues, onClose }) => {
  const dispatch = useDispatch();
  const isEditMode = Boolean(initialValues && initialValues.id);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        email: initialValues.email || "",
        expertise: initialValues.expertise || "",
        bio: initialValues.bio || "",
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [initialValues, open]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const speakerDto = { ...form };

    if (isEditMode) {
      const result = await dispatch(
        updateSpeaker({ id: initialValues.id, speakerDto })
      );
      if (updateSpeaker.fulfilled.match(result)) {
        message.success("Speaker updated successfully.");
        onClose();
      }
    } else {
      const result = await dispatch(createSpeaker(speakerDto));
      if (createSpeaker.fulfilled.match(result)) {
        message.success("Speaker created successfully.");
        resetForm();
        onClose();
      }
    }
  };

  return (
    <Modal
      open={open}
      title={isEditMode ? "Edit Speaker" : "Add Speaker"}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="speaker-name">Name</label>
        <Input
          id="speaker-name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange("name")}
        />
        {errors.name && <div style={{ color: "#ff4d4f" }}>{errors.name}</div>}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="speaker-email">Email</label>
        <Input
          id="speaker-email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange("email")}
        />
        {errors.email && (
          <div style={{ color: "#ff4d4f" }}>{errors.email}</div>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="speaker-expertise">Expertise</label>
        <Input
          id="speaker-expertise"
          placeholder="Expertise"
          value={form.expertise}
          onChange={handleChange("expertise")}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="speaker-bio">Bio</label>
        <TextArea
          id="speaker-bio"
          placeholder="Short Bio"
          rows={3}
          value={form.bio}
          onChange={handleChange("bio")}
        />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Button onClick={resetForm}>Reset</Button>
        <Button type="primary" block onClick={handleSubmit}>
          Save Speaker
        </Button>
      </div>
    </Modal>
  );
};

export default SpeakerForm;
