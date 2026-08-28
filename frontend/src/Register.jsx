import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button, message, Card, Typography } from "antd";
import { registerUser, clearAuthError } from "./store/slices/authSlice";

const { Title } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redirect to home once registered and authenticated.
  useEffect(() => {
    if (isAuthenticated) {
      message.success("User registered successfully");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearAuthError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username.trim()) {
      message.error("Username is required");
      return;
    }
    if (!password.trim()) {
      message.error("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    dispatch(registerUser({ username, password }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Card style={{ width: 380 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          EventSphere Register
        </Title>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="large"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input.Password
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              size="large"
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
          >
            Register
          </Button>
        </form>
        <p style={{ textAlign: "center", marginTop: 16 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
