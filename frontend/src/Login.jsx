import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button, message, Card, Typography } from "antd";
import { loginUser, clearAuthError } from "./store/slices/authSlice";

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameInputRef = useRef(null);

  // Focus the username field as soon as the login screen mounts.
  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  // Redirect to the home page once authenticated, and surface a success
  // toast per the Login spec.
  useEffect(() => {
    if (isAuthenticated) {
      message.success("Login successful");
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
    dispatch(loginUser({ username, password }));
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
          EventSphere Login
        </Title>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <Input
              ref={usernameInputRef}
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
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
          >
            Login
          </Button>
        </form>
        <p style={{ textAlign: "center", marginTop: 16 }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
