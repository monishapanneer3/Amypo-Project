import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  fetchSessions,
  deleteSession,
  setSessionPage,
  clearSessionStatus,
} from "../../store/slices/sessionSlice";
import SessionForm from "./SessionForm";

const SessionList = () => {
  const dispatch = useDispatch();
  const {
    content: sessions,
    loading,
    error,
    statusMessage,
    page,
    size,
    totalElements,
  } = useSelector((state) => state.sessions);

  const [formOpen, setFormOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);

  useEffect(() => {
    dispatch(fetchSessions({ page, size }));
  }, [dispatch, page, size]);

  useEffect(() => {
    if (statusMessage) {
      message.success(statusMessage);
      dispatch(clearSessionStatus());
    }
    if (error) {
      dispatch(clearSessionStatus());
    }
  }, [statusMessage, error, dispatch]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this session?",
      okText: "Delete",
      okButtonProps: { danger: true },
      onOk: () => {
        dispatch(deleteSession(id));
      },
    });
  };

  const handleAdd = () => {
    setEditingSession(null);
    setFormOpen(true);
  };

  const handleEdit = (record) => {
    setEditingSession(record);
    setFormOpen(true);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "sessionName",
      key: "sessionName",
      render: (text) => <span>{text}</span>,
    },
    { title: "Topic", dataIndex: "topic", key: "topic" },
    { title: "Day", dataIndex: "dayOfWeek", key: "dayOfWeek" },
    {
      title: "Time",
      key: "time",
      render: (_, record) => `${record.startTime || ""} - ${record.endTime || ""}`,
    },
    {
      title: "Speakers",
      key: "speaker",
      render: (_, record) => record.speaker?.name || record.speakerName || "-",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
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
    <div
      id="session-container-t28"
      style={{ margin: "20px", textAlign: "center" }}
    >
      <h1>Session List</h1>

      <div style={{ textAlign: "right", maxWidth: 1100, margin: "0 auto 16px" }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Session
        </Button>
      </div>

      {loading && <div data-testid="loader">Loading participants...</div>}

      {error && (
        <div data-testid="status-msg" style={{ color: "#ff4d4f" }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <Table
          rowKey="id"
          dataSource={sessions}
          columns={columns}
          style={{ maxWidth: 1100, margin: "0 auto" }}
          pagination={{
            current: page + 1,
            pageSize: size,
            total: totalElements,
            onChange: (newPage) => dispatch(setSessionPage(newPage - 1)),
          }}
          locale={{ emptyText: "No sessions found" }}
        />
      )}

      {formOpen && (
        <SessionForm
          open={formOpen}
          initialValues={editingSession}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
};

export default SessionList;
