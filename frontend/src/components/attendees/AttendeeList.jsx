import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  fetchAttendees,
  deleteAttendee,
  setAttendeePage,
  clearAttendeeStatus,
} from "../../store/slices/attendeeSlice";
import AttendeeForm from "./AttendeeForm";

const AttendeeList = () => {
  const dispatch = useDispatch();
  const {
    content: attendees,
    loading,
    error,
    statusMessage,
    page,
    size,
    totalElements,
  } = useSelector((state) => state.attendees);

  const [formOpen, setFormOpen] = useState(false);
  const [editingAttendee, setEditingAttendee] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    dispatch(fetchAttendees({ page, size }));
  }, [dispatch, page, size]);

  useEffect(() => {
    if (statusMessage) {
      setStatusMsg(statusMessage);
      dispatch(clearAttendeeStatus());
    }
    if (error) {
      setStatusMsg(error);
      dispatch(clearAttendeeStatus());
    }
  }, [statusMessage, error, dispatch]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this attendee?",
      okText: "Delete",
      okButtonProps: { danger: true },
      onOk: async () => {
        // Simulated DELETE interceptor notification.
        message.info("Item deleted via DELETE");
        const result = await dispatch(deleteAttendee(id));
        if (deleteAttendee.fulfilled.match(result)) {
          message.success("Attendee deleted successfully");
        }
      },
    });
  };

  const handleAdd = () => {
    setEditingAttendee(null);
    setFormOpen(true);
  };

  const handleEdit = (record) => {
    setEditingAttendee(record);
    setFormOpen(true);
  };

  const columns = [
    { title: "Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Registration Type",
      dataIndex: "registrationType",
      key: "registrationType",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ margin: "20px" }}>
      <h1>Attendee List</h1>

      <div style={{ textAlign: "right", maxWidth: 1100, margin: "0 auto 16px" }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Register Attendee
        </Button>
      </div>

      {loading && <div data-testid="loader">Loading participants...</div>}

      {statusMsg && (
        <div data-testid="status-msg" style={{ marginBottom: 12 }}>
          {statusMsg}
        </div>
      )}

      {!loading && (
        <Table
          rowKey="id"
          dataSource={attendees}
          columns={columns}
          style={{ maxWidth: 1100, margin: "0 auto" }}
          pagination={{
            current: page + 1,
            pageSize: size,
            total: totalElements,
            onChange: (newPage) => dispatch(setAttendeePage(newPage - 1)),
          }}
          locale={{ emptyText: "No attendees found" }}
        />
      )}

      {formOpen && (
        <AttendeeForm
          open={formOpen}
          initialValues={editingAttendee}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
};

export default AttendeeList;
