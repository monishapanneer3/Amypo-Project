import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  fetchSpeakers,
  deleteSpeaker,
  setSpeakerPage,
  clearSpeakerStatus,
} from "../../store/slices/speakerSlice";
import SpeakerForm from "./SpeakerForm";

const SpeakerList = () => {
  const dispatch = useDispatch();
  const {
    content: speakers,
    loading,
    error,
    statusMessage,
    page,
    size,
    totalElements,
  } = useSelector((state) => state.speakers);

  const [formOpen, setFormOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState(null);

  useEffect(() => {
    dispatch(fetchSpeakers({ page, size }));
  }, [dispatch, page, size]);

  useEffect(() => {
    if (statusMessage) {
      message.success(statusMessage);
      dispatch(clearSpeakerStatus());
    }
    if (error) {
      message.error(error);
      dispatch(clearSpeakerStatus());
    }
  }, [statusMessage, error, dispatch]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this speaker?",
      okText: "Delete",
      okButtonProps: { danger: true },
      onOk: () => {
        dispatch(deleteSpeaker(id));
      },
    });
  };

  const handleAdd = () => {
    setEditingSpeaker(null);
    setFormOpen(true);
  };

  const handleEdit = (record) => {
    setEditingSpeaker(record);
    setFormOpen(true);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Expertise", dataIndex: "expertise", key: "expertise" },
    { title: "Bio", dataIndex: "bio", key: "bio" },
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
    <div className="speaker-container" style={{ margin: "20px" }}>
      <div>
        <h1>Speaker List</h1>
      </div>

      <div style={{ textAlign: "right", maxWidth: 1100, margin: "0 auto 16px" }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Speaker
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
          dataSource={speakers}
          columns={columns}
          style={{ maxWidth: 1100, margin: "0 auto" }}
          pagination={{
            current: page + 1,
            pageSize: size,
            total: totalElements,
            onChange: (newPage) => dispatch(setSpeakerPage(newPage - 1)),
          }}
          locale={{ emptyText: "No speakers found" }}
        />
      )}

      {formOpen && (
        <SpeakerForm
          open={formOpen}
          initialValues={editingSpeaker}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
};

export default SpeakerList;
