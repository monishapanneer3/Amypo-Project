import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Input, Select, Button, message } from "antd";
import {
  createAttendee,
  updateAttendee,
} from "../../store/slices/attendeeSlice";

const emptyForm = {
  fullName: "",
  email: "",
  registrationType: "General",
  userName: "",
};

const AttendeeForm = ({ open, initialValues, onClose }) => {
  const dispatch = useDispatch();
  const isEditMode = Boolean(initialValues && initialValues.id);

  const [form, setForm] = useState(emptyForm);
  const [statusMsg, setStatusMsg] = useState(null);
  const [nameError, setNameError] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setForm({
        fullName: initialValues.fullName || "",
        email: initialValues.email || "",
        registrationType: initialValues.registrationType || "General",
        userName: initialValues.userName || initialValues.user?.username || "",
      });
    } else {
      setForm(emptyForm);
    }
    setNameError(null);
    setStatusMsg(null);
  }, [initialValues, open]);

  const handleChange = (field) => (e) => {
    const value = e && e.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setNameError(null);
    setStatusMsg(null);
  };

  const handleSubmit = async () => {
    if (!form.fullName.trim()) {
      setNameError("Name is required");
      return; // Block the API call entirely.
    }
    setNameError(null);

    // Map flattened user data (userName) onto the backend AttendeeDTO shape.
    const attendeeDto = {
      fullName: form.fullName,
      email: form.email,
      registrationType: form.registrationType,
      userName: form.userName,
    };

    if (isEditMode) {
      const result = await dispatch(
        updateAttendee({ id: initialValues.id, attendeeDto })
      );
      if (updateAttendee.fulfilled.match(result)) {
        message.success("Item updated via PUT");
        setStatusMsg("Item updated via PUT");
        onClose();
      }
    } else {
      const result = await dispatch(createAttendee(attendeeDto));
      if (createAttendee.fulfilled.match(result)) {
        message.success("Registration Successful");
        setStatusMsg("Registration Successful");
        resetForm();
        onClose();
      }
    }
  };

  return (
    <Modal
      open={open}
      title={isEditMode ? "Edit Attendee" : "Register Attendee"}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="attendee-name">Name</label>
        <Input
          id="attendee-name"
          placeholder="Enter Name"
          value={form.fullName}
          onChange={handleChange("fullName")}
        />
        {nameError && <div style={{ color: "#ff4d4f" }}>{nameError}</div>}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="attendee-email">Email</label>
        <Input
          id="attendee-email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange("email")}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="attendee-username">Username</label>
        <Input
          id="attendee-username"
          placeholder="Linked username"
          value={form.userName}
          onChange={handleChange("userName")}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Registration Type</label>
        <Select
          style={{ width: "100%" }}
          value={form.registrationType}
          onChange={(value) =>
            setForm((prev) => ({ ...prev, registrationType: value }))
          }
          options={[
            { value: "VIP", label: "VIP" },
            { value: "General", label: "General" },
            { value: "Student", label: "Student" },
          ]}
        />
      </div>

      {statusMsg && <div data-testid="status-msg">{statusMsg}</div>}

      <div style={{ display: "flex", gap: 8 }}>
        <Button onClick={resetForm}>Reset</Button>
        <Button
          id="register-btn-t27"
          type="primary"
          block
          style={{ transition: "all 0.3s", cursor: "pointer" }}
          onClick={handleSubmit}
        >
          {isEditMode ? "Update" : "Register"}
        </Button>
      </div>
    </Modal>
  );
};

export default AttendeeForm;
